# Card Layouts

> **Use Case:** Showcase of card components and column layouts for content organization.
>
> **Key Features:** Basic cards, feature cards, pricing cards, profile cards, product cards, card columns

## Card Component Showcase

Comprehensive examples of card layouts and patterns.

---

## 1. Basic Card

### Simple Card

```markdown
::: card
### Card Title
This is a basic card with title and content.

[Learn More]
:::
```

**Rendered:**
::: card
### Card Title
This is a basic card with title and content.

[Learn More]
:::

---

### Card with Image

```markdown
::: card
![Feature Image](https://via.placeholder.com/400x200)

### Image Card
Cards can include images, text, and buttons for rich content presentation.

[View Details →]
:::
```

**Rendered:**
::: card
![Feature Image](https://via.placeholder.com/400x200)

### Image Card
Cards can include images, text, and buttons for rich content presentation.

[View Details →]
:::

---

## 2. Feature Cards

### Three Column Feature Layout

```markdown
::: columns-3 card
::: column :rocket: Fast Performance
Lightning-quick loading times and optimized rendering for the best user experience.

[Learn More →]

:::
::: column :shield: Secure by Default
Enterprise-grade security with encryption, backups, and compliance certifications.

[Learn More →]

:::
::: column :settings: Highly Customizable
Flexible configuration options and extensive API for complete control.

[Learn More →]
:::
:::
```

**Rendered:**
::: columns-3 card
::: column :rocket: Fast Performance
Lightning-quick loading times and optimized rendering for the best user experience.

[Learn More →]

:::
::: column :shield: Secure by Default
Enterprise-grade security with encryption, backups, and compliance certifications.

[Learn More →]

:::
::: column :settings: Highly Customizable
Flexible configuration options and extensive API for complete control.

[Learn More →]
:::
:::

---

## 3. Pricing Cards

### Pricing Tiers

```markdown
::: columns-3 card
::: column Starter
**$9** /month

Perfect for individuals

- 5 Projects
- 10 GB Storage
- Basic Support
- Email Reports

[Start Free Trial]*

:::
::: column Professional
**$29** /month

*Most Popular*

For growing teams

- Unlimited Projects
- 100 GB Storage
- Priority Support
- Advanced Analytics
- API Access

[Start Free Trial]*

:::
::: column Enterprise
**Custom**

For large organizations

- Everything in Pro
- Unlimited Storage
- Dedicated Support
- Custom Integration
- SLA Guarantee

[Contact Sales]*
:::
:::
```

**Rendered:**
::: columns-3 card
::: column Starter
**$9** /month

Perfect for individuals

- 5 Projects
- 10 GB Storage
- Basic Support
- Email Reports

[Start Free Trial]*

:::
::: column Professional
**$29** /month

*Most Popular*

For growing teams

- Unlimited Projects
- 100 GB Storage
- Priority Support
- Advanced Analytics
- API Access

[Start Free Trial]*

:::
::: column Enterprise
**Custom**

For large organizations

- Everything in Pro
- Unlimited Storage
- Dedicated Support
- Custom Integration
- SLA Guarantee

[Contact Sales]*
:::
:::

---

## 4. Product Cards

### Product Columns

```markdown
::: columns-4 card
::: column Wireless Headphones
![Product](https://via.placeholder.com/250x250)

~~$129.99~~ **$89.99**

:star::star::star::star::star: (127 reviews)

[Add to Cart]*

:::
::: column Smart Watch
![Product](https://via.placeholder.com/250x250)

**$299.99**

:star::star::star::star: (89 reviews)

[Add to Cart]*

:::
::: column Bluetooth Speaker
![Product](https://via.placeholder.com/250x250)

~~$79.99~~ **$49.99**

:star::star::star::star::star: (203 reviews)

[Add to Cart]*

:::
::: column Fitness Tracker
![Product](https://via.placeholder.com/250x250)

**$149.99**

:star::star::star::star: (156 reviews)

[Add to Cart]*
:::
:::
```

**Rendered:**
::: columns-4 card
::: column Wireless Headphones
![Product](https://via.placeholder.com/250x250)

~~$129.99~~ **$89.99**

:star::star::star::star::star: (127 reviews)

[Add to Cart]*

:::
::: column Smart Watch
![Product](https://via.placeholder.com/250x250)

**$299.99**

:star::star::star::star: (89 reviews)

[Add to Cart]*

:::
::: column Bluetooth Speaker
![Product](https://via.placeholder.com/250x250)

~~$79.99~~ **$49.99**

:star::star::star::star::star: (203 reviews)

[Add to Cart]*

:::
::: column Fitness Tracker
![Product](https://via.placeholder.com/250x250)

**$149.99**

:star::star::star::star: (156 reviews)

[Add to Cart]*
:::
:::

---

## 5. Profile/Team Cards

### Team Member Columns

```markdown
::: columns-4 card
::: column Sarah Johnson
![Profile](https://via.placeholder.com/200x200)

**CEO & Founder**

"Passionate about building great products"

[LinkedIn] [Twitter] [[email protected]]

:::
::: column Michael Chen
![Profile](https://via.placeholder.com/200x200)

**CTO**

"Technology enthusiast and problem solver"

[LinkedIn] [GitHub] [[email protected]]

:::
::: column Emma Rodriguez
![Profile](https://via.placeholder.com/200x200)

**Head of Design**

"Creating beautiful user experiences"

[LinkedIn] [Dribbble] [[email protected]]

:::
::: column David Kim
![Profile](https://via.placeholder.com/200x200)

**Lead Developer**

"Building scalable solutions"

[LinkedIn] [GitHub] [[email protected]]
:::
:::
```

**Rendered:**
::: columns-4 card
::: column Sarah Johnson
![Profile](https://via.placeholder.com/200x200)

**CEO & Founder**

"Passionate about building great products"

[LinkedIn] [Twitter] [[email protected]]

:::
::: column Michael Chen
![Profile](https://via.placeholder.com/200x200)

**CTO**

"Technology enthusiast and problem solver"

[LinkedIn] [GitHub] [[email protected]]

:::
::: column Emma Rodriguez
![Profile](https://via.placeholder.com/200x200)

**Head of Design**

"Creating beautiful user experiences"

[LinkedIn] [Dribbble] [[email protected]]

:::
::: column David Kim
![Profile](https://via.placeholder.com/200x200)

**Lead Developer**

"Building scalable solutions"

[LinkedIn] [GitHub] [[email protected]]
:::
:::

---

## 6. Blog/Article Cards

### Blog Post Columns

```markdown
::: columns-3 card
::: column Getting Started with Wireframing
![Blog Post](https://via.placeholder.com/350x200)

Learn the fundamentals of wireframing and how to create effective designs quickly.

**Design** • 5 min read • Mar 15, 2025

[Read More →]

:::
::: column 10 UI Design Principles
![Blog Post](https://via.placeholder.com/350x200)

Essential principles every designer should know for creating intuitive interfaces.

**UI/UX** • 8 min read • Mar 12, 2025

[Read More →]

:::
::: column Accessibility Best Practices
![Blog Post](https://via.placeholder.com/350x200)

Make your designs inclusive and accessible to all users with these proven techniques.

**Accessibility** • 6 min read • Mar 10, 2025

[Read More →]
:::
:::
```

**Rendered:**
::: columns-3 card
::: column Getting Started with Wireframing
![Blog Post](https://via.placeholder.com/350x200)

Learn the fundamentals of wireframing and how to create effective designs quickly.

**Design** • 5 min read • Mar 15, 2025

[Read More →]

:::
::: column 10 UI Design Principles
![Blog Post](https://via.placeholder.com/350x200)

Essential principles every designer should know for creating intuitive interfaces.

**UI/UX** • 8 min read • Mar 12, 2025

[Read More →]

:::
::: column Accessibility Best Practices
![Blog Post](https://via.placeholder.com/350x200)

Make your designs inclusive and accessible to all users with these proven techniques.

**Accessibility** • 6 min read • Mar 10, 2025

[Read More →]
:::
:::

---

## 7. Testimonial Cards

### Customer Testimonials

```markdown
::: columns-3 card
::: column :star::star::star::star::star:
*"This product completely transformed how we work. Best decision we made this year!"*

**Sarah Johnson**
CEO, TechStart Inc.

:::
::: column :star::star::star::star::star:
*"Outstanding support and incredible features. Highly recommended for any team."*

**Michael Chen**
CTO, DataCorp

:::
::: column :star::star::star::star::star:
*"Easy to use, powerful features, and great value. We couldn't be happier."*

**Emily Rodriguez**
Operations Director
:::
:::
```

**Rendered:**
::: columns-3 card
::: column :star::star::star::star::star:
*"This product completely transformed how we work. Best decision we made this year!"*

**Sarah Johnson**
CEO, TechStart Inc.

:::
::: column :star::star::star::star::star:
*"Outstanding support and incredible features. Highly recommended for any team."*

**Michael Chen**
CTO, DataCorp

:::
::: column :star::star::star::star::star:
*"Easy to use, powerful features, and great value. We couldn't be happier."*

**Emily Rodriguez**
Operations Director
:::
:::

---

## 8. Stats/Metrics Cards

### Key Metrics Dashboard

```markdown
::: columns-4 card
::: column Total Users
**124,567**
:chart: +12.5% this month

:::
::: column Revenue
**$458,234**
:chart: +18.3% this month

:::
::: column Conversion Rate
**3.2%**
:chart: +0.8% this month

:::
::: column Customer Satisfaction
**4.8** / 5.0
:star::star::star::star::star:
:::
:::
```

**Rendered:**
::: columns-4 card
::: column Total Users
**124,567**
:chart: +12.5% this month

:::
::: column Revenue
**$458,234**
:chart: +18.3% this month

:::
::: column Conversion Rate
**3.2%**
:chart: +0.8% this month

:::
::: column Customer Satisfaction
**4.8** / 5.0
:star::star::star::star::star:
:::
:::

---

## 9. Interactive Cards with States

### Card States

```markdown
::: columns-2 card
::: column Normal Card
::: card
Regular card in default state

[Action Button]
:::

:::
::: column Highlighted Card
::: card
**Featured!**

This card has special emphasis

[Primary Action]*
:::
:::
:::
```

**Rendered:**
::: columns-2 card
::: column Normal Card
::: card
Regular card in default state

[Action Button]
:::

:::
::: column Highlighted Card
::: card
**Featured!**

This card has special emphasis

[Primary Action]*
:::
:::
:::

---

## 10. Complex Content Cards

### Rich Content Cards

```markdown
::: card
### Project Dashboard Card

**Project:** Mobile App Redesign
**Status:** In Progress
**Due Date:** Mar 25, 2025

---

#### Team Members
- :user: Sarah (Lead Designer)
- :user: Mike (Developer)
- :user: Emma (QA)

#### Progress
[###############___] 75% Complete

---

**Recent Activity:**
- Design mockups approved (2h ago)
- API integration started (5h ago)
- Sprint planning completed (1d ago)

---

[View Project →] [Edit] [Share]
:::
```

**Rendered:**
::: card
### Project Dashboard Card

**Project:** Mobile App Redesign
**Status:** In Progress
**Due Date:** Mar 25, 2025

---

#### Team Members
- :user: Sarah (Lead Designer)
- :user: Mike (Developer)
- :user: Emma (QA)

#### Progress
[###############___] 75% Complete

---

**Recent Activity:**
- Design mockups approved (2h ago)
- API integration started (5h ago)
- Sprint planning completed (1d ago)

---

[View Project →] [Edit] [Share]
:::

---

## 11. Horizontal Cards

### List-Style Cards

```markdown
::: card
**Order #12345** | Status: Shipped | Total: $129.99

![Product Thumbnail](https://via.placeholder.com/80x80)

- Wireless Headphones (Qty: 1)
- USB-C Cable (Qty: 2)

Expected Delivery: Mar 20, 2025

[Track Order →] [View Invoice]
:::
```

**Rendered:**
::: card
**Order #12345** | Status: Shipped | Total: $129.99

![Product Thumbnail](https://via.placeholder.com/80x80)

- Wireless Headphones (Qty: 1)
- USB-C Cable (Qty: 2)

Expected Delivery: Mar 20, 2025

[Track Order →] [View Invoice]
:::

---

## 12. Columns Layout vs Card Columns

### Pure Layout Columns (no card chrome)

Use `::: columns-N` without `card` when items are form fields, text columns, or anything that should not have card borders/backgrounds.

```markdown
::: columns-2
::: column Your Details
Name
[_____________________________]{required}

Email
[_____________________________]{type:email required}

:::
::: column Message
Subject
[_____________________________]{required}

[Send Message]*
:::
:::
```

**Rendered:**
::: columns-2
::: column Your Details
Name
[_____________________________]{required}

Email
[_____________________________]{type:email required}

:::
::: column Message
Subject
[_____________________________]{required}

[Send Message]*
:::
:::

---

### Card Columns (with card chrome)

Add `card` to apply card borders and backgrounds to each item.

```markdown
::: columns-3 card
::: column :rocket: Fast
Renders in milliseconds.

:::
::: column :shield: Secure
Enterprise-grade by default.

:::
::: column :settings: Flexible
Works with any stack.
:::
:::
```

**Rendered:**
::: columns-3 card
::: column :rocket: Fast
Renders in milliseconds.

:::
::: column :shield: Secure
Enterprise-grade by default.

:::
::: column :settings: Flexible
Works with any stack.
:::
:::

---

### Column Spanning

Add `span-N` to a `::: column` opener to span multiple columns.

```markdown
::: columns-3 card
::: column Starter
$9/month — up to 3 projects.

:::
::: column Pro {span-2}
$29/month — unlimited projects, priority support, spans two columns.
:::
:::
```

**Rendered:**
::: columns-3 card
::: column Starter
$9/month — up to 3 projects.

:::
::: column Pro {span-2}
$29/month — unlimited projects, priority support, spans two columns.
:::
:::

---

## Best Practices
::: card

### Card Design Guidelines

1. **Consistent Spacing**
   - Maintain uniform padding
   - Use consistent card heights in columns
   - Balance content density

2. **Clear Hierarchy**
   - Use heading levels appropriately
   - Primary action should be prominent
   - Group related information

3. **Responsive Design**
   - Use column layouts (`columns-2`, `columns-3`, etc.)
   - Cards should stack on mobile
   - Images should scale properly

4. **Content Strategy**
   - Keep card content concise
   - Use clear call-to-action
   - Include relevant imagery

5. **Visual Balance**
   - Don't overcrowd cards
   - Use whitespace effectively
   - Maintain alignment
:::

---

**Style Variations:**
- `sketch` - Hand-drawn card wireframes
- `clean` - Modern minimal cards
- `wireframe` - Structure-focused cards
- `tailwind` - Contemporary card design
- `material` - Elevated Google-style cards
- `brutal` - Bold card layouts
- `none` - Semantic HTML for custom styling

**Generate this example:**
```bash
wiremd card-layouts.md --style sketch
wiremd card-layouts.md --style clean -o cards-clean.html
wiremd card-layouts.md --style material -o cards-material.html
```
