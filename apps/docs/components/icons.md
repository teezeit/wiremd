![[_sidebar.md]]
# Icons

Use `:name:` inline anywhere — in headings, buttons, nav bars, or plain text.

## Basic Usage
::: demo
:home: Home  :user: Profile  :settings: Settings
:::
::: demo
[:search: Search]*  [:edit: Edit]  [:delete: Delete]{danger}
:::
::: demo
[[ :logo: MyApp | :home: Home | :bell: Alerts | :user: Account ]]
:::

## Available Icons

Icons render as inline Tabler SVGs. Existing names remain supported as aliases.

### UI & Actions

::: row
:activity: Activity
:bell: Bell
:bookmark: Bookmark
:calendar: Calendar
:check: Check
:circle-check: Circle check
:clock: Clock
:copy: Copy
:download: Download
:edit: Edit
:external-link: External link
:filter: Filter
:heart: Heart
:home: Home
:info-circle: Info
:link: Link
:login: Login
:logout: Logout
:menu-2: Menu
:minus: Minus
:plus: Plus
:refresh: Refresh
:search: Search
:send: Send
:settings: Settings
:star: Star
:trash: Trash
:upload: Upload
:user: User
:users: Users
:x: X
:::

### Navigation

::: row
:arrow-up: Arrow up
:arrow-down: Arrow down
:arrow-left: Arrow left
:arrow-right: Arrow right
:chevron-up: Chevron up
:chevron-down: Chevron down
:chevron-left: Chevron left
:chevron-right: Chevron right
:dots: More
:::

### Status

::: row
:alert-circle: Error
:alert-triangle: Warning
:circle-check: Success
:eye: Visible
:eye-off: Hidden
:lock: Locked
:lock-open: Unlocked
:shield: Shield
:::

### Communication & Media

::: row
:mail: Mail
:message-circle: Chat
:microphone: Microphone
:phone: Phone
:player-play: Play
:player-pause: Pause
:player-stop: Stop
:video: Video
:::

### Files & Content

::: row
:clipboard-list: Clipboard
:file: File
:file-text: Document
:file-type-pdf: PDF
:folder: Folder
:photo: Image
:::

### Business & Finance

::: row
:briefcase: Briefcase
:building: Building
:cash: Cash
:chart-bar: Bar chart
:chart-line: Line chart
:chart-pie: Pie chart
:coin: Coin
:credit-card: Credit card
:currency-dollar: Dollar
:currency-euro: Euro
:currency-pound: Pound
:shopping-cart: Cart
:tag: Tag
:wallet: Wallet
:::

### Tech, Map & Logistics

::: row
:cloud: Cloud
:code: Code
:database: Database
:device-desktop: Desktop
:device-mobile: Mobile
:layout-dashboard: Dashboard
:map: Map
:map-pin: Location
:package: Package
:server: Server
:truck: Truck
:wifi: Wifi
:world: World
:::

### Activities & Objects

::: row
:bulb: Idea
:diamond: Logo
:flag: Flag
:gift: Gift
:key: Key
:rocket: Rocket
:trophy: Trophy
:::

### Social Media

::: row
:brand-github: GitHub
:brand-x: X
:brand-linkedin: LinkedIn
:brand-facebook: Facebook
:brand-instagram: Instagram
:brand-youtube: YouTube
:::

### Compatibility Aliases

| Alias | Uses |
|------|------|
| `:brand:` | `:diamond:` |
| `:cart:` | `:shopping-cart:` |
| `:chart:` | `:chart-bar:` |
| `:chat:` | `:message-circle:` |
| `:close:` | `:x:` |
| `:delete:` | `:trash:` |
| `:document:` | `:file-text:` |
| `:dollar:` | `:currency-dollar:` |
| `:error:` | `:alert-circle:` |
| `:euro:` | `:currency-euro:` |
| `:gear:` | `:settings:` |
| `:github:` | `:brand-github:` |
| `:image:` | `:photo:` |
| `:info:` | `:info-circle:` |
| `:location:` | `:map-pin:` |
| `:logo:` | `:diamond:` |
| `:menu:` | `:menu-2:` |
| `:more:` | `:dots:` |
| `:pdf:` | `:file-type-pdf:` |
| `:pound:` | `:currency-pound:` |
| `:success:` | `:circle-check:` |
| `:twitter:` | `:brand-x:` |
| `:unlock:` | `:lock-open:` |
| `:warning:` | `:alert-triangle:` |

## Syntax

```
:name:              inline icon
[:name: Label]*     icon in a button
:name: Label        icon before text
[[ :logo: Brand | ... ]]  icon in navbar brand
```

Unknown icon names fall back to `:circle:`.
