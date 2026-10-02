# Login surface

Route: /login. Mode: Operate. Scope: login only; the authenticated application and password-change layout retain their existing design.

## Direction contract

THESIS: An identifiable school entrance with a book crest, explicit Student Information System identity, campus image, and direct account access.

OWN-WORLD: Preserve Source Sans 3, registrar navy #102a43, action cobalt #0b63f3, porcelain #f4f7fb, ruled line #d8e2ef. White masthead and form, spacious campus panel, rounded photographic plate. No institution-specific claims or fabricated school name.

STORY: Students and staff immediately recognize their academic portal and sign in with existing credentials. The help disclosure directs account issues to the registrar or administrator.

FIRST VIEWPORT: Full-width institutional masthead, campus introduction and photograph on the left, unboxed form on the right. Mobile retains the school identity and prioritizes the form, removing the large photographic plate.

FORM: Academic welcome desk, grounded candidate 6; seed 8d28c55f. User's professional school direction and incumbent brand constrain expression. Code-led implementation keeps the existing component system. Interaction is focused on password visibility, submission feedback, and inline access help; no entrance animation delays access.

FINISH: Desktop and mobile captures, behavior tests, required quality gate, independent finish review, and documented surface tokens and asset origin.

## Asset origin

public/images/campus.jpg: Porter Raab, Unsplash, https://unsplash.com/photos/Ucr4Yp-t364. Downloaded from https://images.unsplash.com/photo-1592280771190-3e2e4d571952 with w=1200 and q=85. Illustrative campus photography, not a claim that this is the user's school. No generated raster assets.

## Observed surface specification

Evidence: `app/layouts/school-portal.vue`, `app/components/auth/LoginForm.vue`, shared base controls, and `app/assets/css/main.css`. These are login-specific extensions of the incumbent Source Sans 3, navy, and cobalt system. `DESIGN.md` and `.impeccable/design.json` remain the global authority.

- **Typography:** The campus heading uses 600 weight, `clamp(34px, 3.4vw, 52px)`, and 1.08 line height; the sign-in heading uses 600 weight, 34px, and 1.15 line height. Introductory copy is 17px on the campus panel and 16px at the form, both with 1.6 line height. Labels and help are 14px; footer and authorization copy are 12px. StudentIS branding is 26px at 700 weight.
- **Controls:** Inputs and the full-width submit button have a 50px minimum height and 16px text, extending the shared 40px controls. Inputs retain 8px corners and use 12px by 14px padding; the password field reserves 52px on the right for a 44px square visibility button. The submit button has 20px horizontal padding and no shadow. Login placeholders explicitly use secondary ink (`#60728a`, opacity 1) to correct their contrast on white. Cobalt focus styling and disabled/loading behavior come from the shared controls.
- **Semantic errors:** The alert uses dark red text (`#991b1b`) on pale red (`#fef2f2`), with a light red border (`#fecaca`) and 8px corners. Field messages use red (`#b91c1c`); invalid inputs retain the shared red border/focus treatment. These colors communicate validation, not branding.
- **Identity and photograph:** The book crest is 52px by 56px, with `8px 8px 20px 20px` corners, a 1px `#bfd0e2` border, porcelain fill, and a 27px navy book icon. The photo plate has 12px corners and a navy caption strip; image height is `clamp(220px, 23vw, 320px)` with cover cropping at 50% 55%. The source attribution above is also embedded in the JPEG COM metadata.

## Responsive layout

- Desktop uses a white masthead, a porcelain campus panel, and an unboxed white sign-in area in a `1.1fr 1fr` grid. The form is capped at 400px. At viewport widths of 1800px and above, the main area is centered and capped at 1700px.
- At 1023px and below, the two-column arrangement remains, the campus heading becomes 36px, and panel side padding becomes 28px.
- At 767px and below, the main area stacks with 24px side padding. The photo, services list, and masthead's academic-portal label are hidden; the campus introduction and form remain. Both headings become 28px, introductory copy becomes 15px, the crest becomes 44px by 48px, branding becomes 23px, and footer/authorization copy becomes 11px. Controls retain their 50px minimum height.

## Existing documentation drift

Observed but not repaired: `PRODUCT.md` retains an earlier application-wide redesign statement, while this brief governs the current login-only scope. The global input specification uses body ink (`#20304a`), while the incumbent shared field implementation uses `#152a44`; the shared primary button also has a cobalt shadow absent from the sidecar's example. This surface removes that button shadow locally. These differences do not authorize changes to the global design documents or other routes.
