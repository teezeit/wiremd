/** wiremd Editor - Example snippets */

export interface Example {
  name: string;
  description: string;
  code: string;
}

export const examples: Example[] = [
  {
    name: 'Login Form',
    description: 'Simple authentication page',
    code: `::: card
## Sign In

Continue to your workspace.

Email
[name@company.com_____________]{type:email required}

Password
[*****************************]{type:password required}

[Keep me signed in]{switch checked}

<!-- Should the primary action say "Sign In" or "Log In"? @sara -->
<!-- "Sign In" is the standard — matches Google, GitHub, etc. @tobias -->
[Sign In]* [Forgot password?]
:::
`,
  },
  {
    name: 'Dashboard',
    description: 'Stats cards with navigation',
    code: `[[ :logo: WireOps | *Dashboard* | Reports | :settings: Settings | [Profile] ]]

## Dashboard Overview

::: columns-4 card
::: column :users: Users
**12,847**
((+14.5%)){success}
:::

::: column :currency-dollar: Revenue
**$45,230**
((+8.2%)){success}
:::

::: column :activity: Sessions
**1,429**
((-3.1%)){warning}
:::

::: column :circle-check: Uptime
**99.98%**
((Healthy)){success}
:::
:::

::: row
[Search activity___________]{type:search}

[Workspace                 _v]
- [Acme Inc](./acme.md)
- [Personal](./personal.md)

[Refresh] [Export]{secondary}
:::

### Recent Activity

| Time | User | Action | Status |
|------|------|--------|--------|
| 2 min ago | Alice | Uploaded file | ((Success)){success} |
| 5 min ago | Bob | Created project | ((Pending)){warning} |
| 12 min ago | Carol | Updated settings | ((Success)){success} |
`,
  },
  {
    name: 'Contact Form',
    description: 'Multi-field form with validation',
    code: `## Contact Us

> We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.

::: columns-2
::: column First Name
[_____________________________]{required}

:::
::: column Last Name
[_____________________________]{required}
:::
:::

::: columns-2
::: column Email
[_____________________________]{type:email required}

:::
::: column Subject
[Select subject             v]{required}
- Product question
- Support request
- Partnership
:::
:::

Message
[Tell us what you need...]{rows:5 required}

[Subscribe to newsletter]{switch checked}

[Send Message]* [Cancel]{secondary}
`,
  },
  {
    name: 'E-commerce Product',
    description: 'Product detail page layout',
    code: `[[ :shopping-cart: Store | Products | Categories | Cart ((3)){primary} | [Account] ]]

[[ Home > Products > Headphones ]]

::: columns-2
::: column
::: card
### :photo: Product Gallery

![Premium headphones]
:::

::: column
::: card
### Premium Wireless Headphones
**$299.99**  ((Sale)){warning}

Rating: :star: :star: :star: :star: :star: (128 reviews)

Color
- (x) Midnight Black
- ( ) Arctic White
- ( ) Ocean Blue

Quantity
[1                         v]
- 1
- 2
- 3
- 4

Product actions
[Actions                   v]
- [Compare]
- [Share]
- [Report issue]

[Add to Cart]* [Save]{secondary}
:::
:::
:::

::: columns-3 card
::: column :truck: Shipping
Free 2-day delivery.

:::
::: column :shield: Warranty
Two-year protection.

:::
::: column :refresh: Returns
30-day returns.
:::
:::
`,
  },
  {
    name: 'Settings Page',
    description: 'User settings with switches and actions',
    code: `[[ :logo: App | Dashboard | *Settings* ]]

## Account Settings

::: tabs

::: tab Profile
First Name
[_____________________________]{required}

Email
[user@example.com_____________]{type:email}

Role
[Select role                v]
- Admin
- Editor
- Viewer

Bio
[Short profile summary...]{rows:3}

[Save Profile]*
:::

::: tab Notifications
[Email notifications]{switch checked}
[Push notifications]{switch checked}
[SMS alerts]{switch}
[Weekly digest]{switch disabled}

[Save Preferences]*
:::

::: tab Security
[Two-factor authentication]{switch checked}
[Require SSO]{switch}
[Session timeout alerts]{switch checked}

Security actions
[Actions                   v]
- [Reset password]
- [Revoke sessions]
- [Download audit log]

[Update Security]* [Discard]{secondary}
:::

:::
`,
  },
  {
    name: 'Landing Page',
    description: 'Marketing hero with features',
    code: `[[ :logo: wiremd | Features | Pricing | Docs | [Get Started] ]]

::: hero
# Design UI with Markdown
### The fastest way to create wireframes and mockups

> Write markdown. Get wireframes. Ship faster.

[Get Started - Free]* [View Documentation]{secondary}
:::

::: columns-3 card
::: column :rocket: Lightning Fast
Write your UI in markdown and see it rendered instantly. No drag and drop needed.

:::
::: column :device-desktop: Multiple Styles
Choose from Sketch, Clean, Material, Tailwind, Brutal, and more visual styles.

<!-- Should this say "For Engineering Teams" with more specifics? @sara -->
<!-- Agreed — mention CLI + VS Code explicitly. @tobias -->
<!-- +1, updated copy sounds way stronger. @mike -->
:::
::: column :settings: Developer First
CLI tool, VS Code extension, and npm package. Fits your existing workflow.

:::
:::

::: row {right}
[Install CLI] [Open Editor]*
:::

---

## What developers are saying

> "wiremd changed how our team communicates about UI. We sketch ideas in markdown during standup and everyone gets it."
>
> — **Sarah Chen**, Staff Engineer at Acme Corp
`,
  },
];
