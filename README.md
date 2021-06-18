# SNAP

Write modern web apps with serverside rendered html and snap data tags.

## Examples

Adding an item to a list: ...

Splitting content in tabs: ...

Opening details in a panel: ...

## How it works

### Data tags

Snap data tags change the behavior of forms and links. 
They convert them to XHR and add response html to the current page.

**data-append-to**="#comments" loads response html as the last child of "comments".

**data-prepend-to**="#messages" loads response html as the first child of "messages".

**data-load-on**="#details" replaces inner html of "details" with response html.

**data-prefetch** fetches a link when it appears on page, reducing load time when it gets clicked.

### CSS classes

**pending** is added to forms or links while their requests are pending. 
It is also removed from other previously pending forms or links that load on the same element.

**loading** is added to the element loaded by a form or link.

**active** is added to links after their content is loaded. 
It is also removed from previously active links that load on the same element.

**error-bucket** tells snap that this is an element where errors should be loaded. 
If there is more than one error-bucket on the page, snap chooses using the priority below.
- First one inside the element where content would be loaded
- First sibling of the element where content would be loaded
- First found on page

### Form drafts

Before replacing an unsubmited form with other content, snap saves it's input values. 
If a form with the same id is loaded, inputs are filled with what was previously typed. 
Use data-dont-save-draft on a form or on specific inputs to avoid that.

### Form clearing

When a form is sent successfully, snap clears all input values. 
Use data-dont-clear-on-submit on a form or on specific inputs to avoid that.

## Contributing

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/eyder/snap)
