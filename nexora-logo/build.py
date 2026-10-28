"""Generate the Nexora logo masters (symbol, wordmark, lockups) as filled outlines.

Every mark is drawn as round-capped centre-line strokes made of straight lines and circular arcs,
then expanded into exact filled outlines (concentric arcs + parallel lines), so the files contain
no strokes, text or effects. Run: python3 build.py
"""
import math
import os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "final")
INK, EMBER, WHITE = "#14112B", "#FF5A36", "#FFFFFF"


def f(v):
    return f"{v:.2f}".rstrip("0").rstrip(".")


def pt(p):
    return f"{f(p[0])} {f(p[1])}"


# ---------- stroke expansion ----------------------------------------------------------------
# A stroke is a list of tangent-continuous segments:
#   ("L", (x0, y0), (x1, y1))
#   ("A", (cx, cy), r, a0, a1)   angles in degrees, screen coords (y down); a1 > a0 = clockwise


def seg_start(s):
    if s[0] == "L":
        return s[1]
    _, c, r, a0, _ = s
    return (c[0] + r * math.cos(math.radians(a0)), c[1] + r * math.sin(math.radians(a0)))


def seg_end(s):
    if s[0] == "L":
        return s[2]
    _, c, r, _, a1 = s
    return (c[0] + r * math.cos(math.radians(a1)), c[1] + r * math.sin(math.radians(a1)))


def tangent(s, at_end):
    if s[0] == "L":
        dx, dy = s[2][0] - s[1][0], s[2][1] - s[1][1]
        n = math.hypot(dx, dy)
        return (dx / n, dy / n)
    _, c, r, a0, a1 = s
    a = math.radians(a1 if at_end else a0)
    sgn = 1 if a1 > a0 else -1
    return (-math.sin(a) * sgn, math.cos(a) * sgn)


def left(t):
    return (t[1], -t[0])


def offset_seg(s, h):
    """Segment offset to the left of travel by h (negative h = right side)."""
    if s[0] == "L":
        n = left(tangent(s, False))
        return ("L", (s[1][0] + n[0] * h, s[1][1] + n[1] * h), (s[2][0] + n[0] * h, s[2][1] + n[1] * h))
    _, c, r, a0, a1 = s
    cw = a1 > a0  # clockwise: centre is on the right, so the left side is the outer one
    return ("A", c, r + h if cw else r - h, a0, a1)


def reverse(s):
    if s[0] == "L":
        return ("L", s[2], s[1])
    _, c, r, a0, a1 = s
    return ("A", c, r, a1, a0)


def emit(s):
    if s[0] == "L":
        return f"L{pt(s[2])}"
    _, c, r, a0, a1 = s
    large = 1 if abs(a1 - a0) > 180 else 0
    sweep = 1 if a1 > a0 else 0
    return f"A{f(r)} {f(r)} 0 {large} {sweep} {pt(seg_end(s))}"


def stroke(segs, w):
    h = w / 2
    lefts = [offset_seg(s, h) for s in segs]
    rights = [reverse(offset_seg(s, -h)) for s in reversed(segs)]
    d = f"M{pt(seg_start(lefts[0]))}"
    d += "".join(emit(s) for s in lefts)
    d += f"A{f(h)} {f(h)} 0 0 1 {pt(seg_start(rights[0]))}"  # end cap
    d += "".join(emit(s) for s in rights)
    d += f"A{f(h)} {f(h)} 0 0 1 {pt(seg_start(lefts[0]))}Z"  # start cap
    return d


def circle(c, r, ccw=False):
    """Full circle as two arcs; ccw=True makes a hole under the nonzero rule."""
    x, y = c
    s = 0 if ccw else 1
    return (f"M{f(x - r)} {f(y)}A{f(r)} {f(r)} 0 1 {s} {f(x + r)} {f(y)}"
            f"A{f(r)} {f(r)} 0 1 {s} {f(x - r)} {f(y)}Z")


def ring(c, r, w):
    return circle(c, r + w / 2) + circle(c, r - w / 2, ccw=True)


def fillet(p_prev, corner, p_next, R):
    """Arc segment rounding the corner between two lines; returns (t_in, arc, t_out)."""
    u = (corner[0] - p_prev[0], corner[1] - p_prev[1])
    v = (p_next[0] - corner[0], p_next[1] - corner[1])
    nu, nv = math.hypot(*u), math.hypot(*v)
    u, v = (u[0] / nu, u[1] / nu), (v[0] / nv, v[1] / nv)
    turn = math.atan2(u[0] * v[1] - u[1] * v[0], u[0] * v[0] + u[1] * v[1])  # + = clockwise on screen
    t = R * math.tan(abs(turn) / 2)
    t_in = (corner[0] - u[0] * t, corner[1] - u[1] * t)
    t_out = (corner[0] + v[0] * t, corner[1] + v[1] * t)
    side = left(u) if turn < 0 else (-left(u)[0], -left(u)[1])
    c = (t_in[0] + side[0] * R, t_in[1] + side[1] * R)
    a0 = math.degrees(math.atan2(t_in[1] - c[1], t_in[0] - c[0]))
    a1 = a0 + math.degrees(turn)
    return t_in, ("A", c, R, a0, a1), t_out


# ---------- symbol --------------------------------------------------------------------------
def symbol_paths(w=38, R=27, dot=19, gap=14, x0=56, x1=200, top=44, bottom=212, angle=60):
    """Voice Line: one line that writes N, with the two voices as detached dots.

    Returns (line_path, dots_path). Dots sit on the stems' axes; `gap` is the clear space
    between each dot and the end of the line. The two corners are pushed past the dots' rows so the
    diagonal runs at exactly `angle` degrees, which also keeps the rounded N at full height.
    """
    ext = ((x1 - x0) * math.tan(math.radians(angle)) - (bottom - top)) / 2
    c_top, c_bot = (x0, top - ext), (x1, bottom + ext)
    t_in1, a1, t_out1 = fillet((x0, bottom), c_top, c_bot, R)
    t_in2, a2, t_out2 = fillet(c_top, c_bot, (x1, top), R)
    start = (x0, bottom - dot - gap - w / 2)
    end = (x1, top + dot + gap + w / 2)
    segs = [("L", start, t_in1), a1, ("L", t_out1, t_in2), a2, ("L", t_out2, end)]
    line = stroke(segs, w)
    dots = circle((x0, bottom), dot) + circle((x1, top), dot)
    return line, dots


def svg(view, body, title="Nexora logo"):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view}" role="img">'
            f"<title>{title}</title>{body}</svg>\n")


# ---------- wordmark ------------------------------------------------------------------------
# Monoline geometric lowercase built on the symbol's language: round caps, circular bowls.
# Units: baseline y=0, x-height 120 (outer), stroke 26, bowl centre-line radius 47.
W = 26
H = 120
RB = (H - W) / 2  # bowl centre-line radius
MID = -H / 2
TOP, BOT = -H + W / 2, -W / 2


def g_n(x):
    a, b = x + W / 2, x + W / 2 + 2 * RB
    arch = [("L", (a, BOT), (a, MID)), ("A", ((a + b) / 2, MID), RB, 180, 360), ("L", (b, MID), (b, BOT))]
    return [stroke(arch, W), stroke([("L", (a, MID), (a, TOP))], W)], W + 2 * RB


def g_e(x):
    c = (x + W / 2 + RB, MID)
    bowl = [("A", c, RB, 360, 42)]
    bar = [("L", (c[0] - RB, MID), (c[0] + RB, MID))]
    return [stroke(bowl, W), stroke(bar, W)], W + 2 * RB


def g_x(x):
    s = 2 * RB * 0.86
    a, b = x + W / 2, x + W / 2 + s
    return [stroke([("L", (a, TOP), (b, BOT))], W), stroke([("L", (a, BOT), (b, TOP))], W)], W + s


def g_o(x):
    return [ring((x + W / 2 + RB, MID), RB, W)], W + 2 * RB


def g_r(x):
    a = x + W / 2
    c = (a + RB, MID)
    shoulder = [("L", (a, BOT), (a, MID)), ("A", c, RB, 180, 292)]
    end = c[0] + RB * math.cos(math.radians(292)) + W / 2
    return [stroke(shoulder, W)], end - x


def g_a(x):
    c = (x + W / 2 + RB, MID)
    stem = c[0] + RB
    return [ring(c, RB, W), stroke([("L", (stem, TOP), (stem, BOT))], W)], W + 2 * RB


GLYPHS = [g_n, g_e, g_x, g_o, g_r, g_a]
# optical gaps after each glyph: straight|round, round|diagonal, diagonal|round, round|straight, open|round
GAPS = [22, 12, 12, 22, 10]


def wordmark(x=0.0):
    paths = []
    for i, g in enumerate(GLYPHS):
        p, adv = g(x)
        paths += p
        x += adv + (GAPS[i] if i < len(GAPS) else 0)
    return "".join(paths), x


def write(name, content):
    with open(os.path.join(OUT, name), "w") as fh:
        fh.write(content)


def main():
    os.makedirs(OUT, exist_ok=True)
    line, dots = symbol_paths()
    # small-size cut: heavier line, bigger dots, wider gaps — for 16–48 px
    sline, sdots = symbol_paths(w=50, R=33, dot=26, gap=18, x0=50, x1=206, top=40, bottom=216)
    # reversed cut: line thinned ~5 % against irradiation on dark grounds
    rline, rdots = symbol_paths(w=36)

    two = lambda l, d, lc, dc: f'<path fill="{lc}" d="{l}"/><path fill="{dc}" d="{d}"/>'
    write("nexora-symbol.svg", svg("0 0 256 256", two(line, dots, INK, EMBER)))
    write("nexora-symbol-black.svg", svg("0 0 256 256", two(line, dots, "#000", "#000")))
    write("nexora-symbol-small.svg", svg("0 0 256 256", two(sline, sdots, INK, EMBER)))
    write("nexora-symbol-reversed.svg", svg("0 0 256 256", two(rline, rdots, WHITE, EMBER)))

    wm, wm_w = wordmark()
    wm_view = f"-2 {-H - 2} {f(wm_w + 4)} {H + 4}"
    write("nexora-wordmark.svg", svg(wm_view, f'<path fill="{INK}" d="{wm}"/>', "Nexora wordmark"))

    # Horizontal lockup: symbol centred on the x-height, half an x-height of space before the name.
    s = 1.6 * H / 206  # symbol ink (y 25..231) = 1.6 × x-height, centred on the x-height
    ty = MID - 128 * s
    space = 0.5 * H
    sym_w = 256 * s
    wm2, wm2_w = wordmark(sym_w + space - 37 * s)
    def horiz(lc, dc, wc):
        g = f'<g transform="translate(0 {f(ty)}) scale({f(s)})">{two(line if lc != WHITE else rline, dots if lc != WHITE else rdots, lc, dc)}</g>'
        return g + f'<path fill="{wc}" d="{wm2}"/>'
    y0, y1 = ty + 25 * s, ty + 231 * s
    hv = f"{f(37 * s - 4)} {f(y0 - 4)} {f(wm2_w - 37 * s + 8)} {f(y1 - y0 + 8)}"
    write("nexora-horizontal.svg", svg(hv, horiz(INK, EMBER, INK)))
    write("nexora-horizontal-black.svg", svg(hv, horiz("#000", "#000", "#000")))
    write("nexora-horizontal-reversed.svg", svg(hv, horiz(WHITE, EMBER, WHITE)))

    # Stacked lockup: symbol centred above the wordmark.
    ss = wm_w * 0.42 / 182  # symbol ink width (37..219) = 42 % of the wordmark
    sx = wm_w / 2 - 128 * ss
    sy = -H - 0.55 * H - 231 * ss
    def stacked(lc, dc, wc):
        rev = lc == WHITE
        g = f'<g transform="translate({f(sx)} {f(sy)}) scale({f(ss)})">{two(rline if rev else line, rdots if rev else dots, lc, dc)}</g>'
        return g + f'<path fill="{wc}" d="{wm}"/>'
    sv = f"-4 {f(sy + 25 * ss - 4)} {f(wm_w + 8)} {f(-(sy + 25 * ss) + 8)}"
    write("nexora-stacked.svg", svg(sv, stacked(INK, EMBER, INK)))
    write("nexora-stacked-reversed.svg", svg(sv, stacked(WHITE, EMBER, WHITE)))
    print("wrote", sorted(os.listdir(OUT)))


if __name__ == "__main__":
    main()
