# Add Certifications Section

## Goal
Add a distinct Certifications section immediately below Education while leaving the existing education timeline unchanged.

## Changes
- Add the three supplied certifications to the portfolio’s centralized content data, preserving their exact names, issuers, and year.
- Create a dedicated Certifications section using a compact vertical list/timeline with small markers, thin dividers, and generous whitespace rather than cards.
- Reuse the existing section heading, warm sandal theme, typography, and gentle staggered scroll-reveal motion.
- Place Certifications after Education and before Resume so it remains separate from the school and college timeline.
- Keep the layout responsive: a clear name/issuer/year row on larger screens and a readable stacked arrangement on small screens.

## Validation
- Confirm all three certifications render in order and their issuers are clearly visible.
- Verify desktop and mobile layouts, scroll animation, and that the Education section remains unchanged.
- Check the application build for errors.

## Technical details
- Add certification data and a small data type in the existing portfolio data module.
- Add one focused portfolio component for the new section.
- Register the section in the home page composition only; no other section content or styling will change.
