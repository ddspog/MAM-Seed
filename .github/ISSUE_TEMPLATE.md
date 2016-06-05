[//]: # (#############################################################)
[//]: # ( WARNING! This is an comment. If you need, use it.           )
[//]: # ( -| READ this below, BEFORE saving the new issue.            )
[//]: # (  V                                                          )

[//]: # ( Checklist:                                                  )
[//]: # (   - Test the issue always with the latest version           )
[//]: # ( of this software available, on the master branch.           )
[//]: # (   - Read the documentation on README.md & wiki.             )
[//]: # (   - Check the FAQ                                           )
[//]: # (   - Search for duplicated issues                            )

[//]: # ( Title:                                                      )
[//]: # (   - Create unique title                                     )
[//]: # (   - Use keywords that you would use to search it.           )
[//]: # (   - Use light description, but to call attention.           )

[//]: # ( QUICK NOTE: 72 characters on each line, is love s2.         )

# Overview

Describe the issue here. Use a TL;DR strategy, to make other
people identify that "Hey, this issue happens with me too!".

Also note that the developers must judge here, whether this
is priority or not.

### Issue environment

| Key                    | Value            | Comments                         |
| ---------------------- | ---------------- | ----------------------- |
| Platform Version:      | Website...       |                         |
| Operating System (OS): | Win10...         | Tested also on a Win8   |
| Browser used:          | Google Chrome... | Not tested on others    |
| MEM-Seed version:      | vX.X.X           |                         |
| Date when tested:      | dd/MM/yyyy       | Testing since then      |

[//]: # ( This section it's optional                                  )
### Context - Why this became an issue

Describe what purpose were you using this software. State if you are a
developer or a simple user. This will be used to rate priority.

Remember that you don't need to explain secret details, nor complex 3rd
party algorithms to tell context of the issue.

## Issue description - What are we facing?

Describe the call to the method that you're think it's related to
issue. Also detail other configuration, and other classes that may have
relation with the issue.

Use `code` for better details.

Blocks of code are great too!
```javascript
// googleMapConfig.js

// Method to config any component using Google Maps directive
export function ConfigGoogleMap(uiGmapGoogleMapApiProvider) {
    'ngInject';

    Meteor.call('getGoogleAPIBrowserConfiguration', (error, result) =>
    {
        if (error) {
            console.error('Oops, unable to get API Key!');
        } else {
            uiGmapGoogleMapApiProvider.configure(result);
        }
    });
}
```

Explain if you were fixing other issues, or developing a new
functionality. Use links for reference. Like
[Google Cloud](https://cloud.google.com/) for example!

### Expected result

Detail what you were expecting to accomplish. Return of functions and
documentation links to explain, why you were expecting this.

### Actual result

Detail what you have received.

![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)

Use images, print-screens and etc. This part must be really visible
appealing.

[//]: # ( This section it's optional if you can't really reproduce.   )
### Steps to reproduce

Try to reproduce this issue on another computers, another browser. Or
even on another brand new code. Then make a summary.

  1. Go to this [pen](http://codepen.io/jaguilera/pen/MYpQVB).
  2. Type 'Campina Grande' on location input.
  3. Click on Go.
  4. Watch on F12 for the error.
