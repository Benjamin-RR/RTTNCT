# R.T.T.N.C.T.
Redirects : Text to next.config - translator

# Fun Facts
This project saved the company I am working for over $646 USD. ^_^

# About this project
This project was thrown together very quickly with the intentions of instead of manually translating a txt file to a js file and it's hundreds of lines of code, to do it fully automatically.

# What it does
Reads every single line and translates each line with these set of rules : 
1. lines beginning with hash are commented lines.
2. lines with the word "Redirect" will be made into a json.
3. Lines including 301 will be given a "permenant: true" while lines including 302 will be given a "permenant: false".
4. Automatically detects your website's domain and adds the value "basePath: false" when your domain isn't used on a found redirect.
5. If a line does not include a hash (comment) or a Redirect, it will not be included in the js file.

# What it doesn't do
This project took 1 day to put together, there are obvious flaws or annoyances that I will most likely never fix, as it is working enough for my needs.
1. Does not format in the way I prefer. (no strings around keys), If this annoys you too you can use vsCode extension Prettier to automatically fix this for you.
2. Does not remove a single comma at the end of the document. Simply delete this manually.
3. Accurately and dynamically use the found (most used) domain to find external links. This part of the code I rushed, and got it done by a cheap method that worked for my case scenario, but will most defiantly give wrong hard to notice results. If I ever (I image not) need this script again, I will attempt to fix this.

# How to run.
Open in your coder and open a new live server. If you don't have already a simple vsCode extension "Live Server" exists that can make this step a one click process. Once installed a "Go Live" button on the bottom right of your vsCode will start up this project automatically.