# Page Blueprints

## Catalog Page

Route: `/catalog`

### Purpose

Help buyers quickly scan available bucks and narrow results without confusion.

### Layout

```text
+-----------------------------------------------------------+
| Goat Semen Catalog                                        |
| Search by buck name, reg. number, sire, dam, or color    |
| [ Search field......................................... ] |
|                                                           |
| [Breed v] [Blood Status v] [Show Correct v]              |
| [Teat Structure v] [Availability v] [Clear Filters]      |
|                                                           |
| 24 results                                                |
|                                                           |
| [Card] [Card] [Card]                                      |
| [Card] [Card] [Card]                                      |
+-----------------------------------------------------------+
```

### Card Content

Each catalog card should include:

- Profile image
- Buck name
- Registration number
- Breed
- Color
- Blood status
- Sire
- Dam
- Show correct
- Availability
- `View Listing` link

### Interaction Rules

- Typing in search updates results
- Filters narrow the result list
- The URL reflects current search and filters
- `Clear Filters` resets the page to the default catalog state

## Buck Detail Page

Route: `/bucks/[slug]`

### Purpose

Show the full information for one buck without crowding the catalog page.

### Layout

```text
+-----------------------------------------------------------+
| Cedar Ridge Archer                                        |
| Reg. #: AB123456                                          |
| Breed: Nubian                                             |
| Color: Black with white trim                              |
| Status: Available                                         |
|                                                           |
| [ Main Image ]                                            |
|                                                           |
| Quick Facts                                               |
| - Percentage/Full Blooded: Full Blooded                   |
| - Enoblement / Points: Ennobled, 12 pts                   |
| - Show Correct: Yes                                       |
| - Teat Structure: Correct, well spaced                    |
|                                                           |
| Pedigree                                                  |
| - Sire: Hillside Titan                                    |
| - Dam: Maple Grove Rose                                   |
| - Full pedigree text                                      |
|                                                           |
| Notes                                                     |
| Optional public notes                                     |
|                                                           |
| [ Gallery thumbnails ]                                    |
|                                                           |
| Back to Catalog                                           |
+-----------------------------------------------------------+
```

### Rendering Rules

- Hide empty optional sections
- Show a placeholder image if no profile image exists
- Keep the top section scannable and compact
- Use the full pedigree text lower on the page

## Content Priorities

Catalog page should prioritize:

- Fast scanning
- Search
- Filter clarity
- Clean comparison between bucks

Buck detail page should prioritize:

- Complete information
- Clear pedigree display
- Trust and readability
