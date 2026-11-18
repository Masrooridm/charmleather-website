# Charm Leather: landing page

Genuine leather belts aur wallets. Static page, koi build ya framework nahi. Seedha GitHub Pages par chalta hai.

## Folder
- `index.html`: poora page (slider, hero, 8 products, belt flip, leather guide, order form)
- `css/style.css`: design
- `js/main.js`: slider, belt flip, card tilt
- `js/order.js`: order form (Google Form/Sheet + WhatsApp)
- `assets/`: logo aur photos

## Photos lagana
`assets/` mein ye naam rakhein (jpg):
- `slide1.jpg`, `slide2.jpg`, `slide3.jpg`: top slider
- `p1.jpg` se `p6.jpg`: products (p6 abhi chhupa hai, Braided Leather Belt ki apni photo ka intezar)
- `belt-black.jpg`, `belt-tan.jpg`: belt flip ki 2 sides

Naam, detail aur price `index.html` mein `<article class="card">` ke andar badlein. Price `Rs. ____` ho to card chhupa rehta hai. `data-ask` wale card ("Price on request") ka button WhatsApp kholta hai, price tay hone par `data-ask` aur "Price on request" hata kar `Rs. 1,500` jaisa price likh dein, to wo order form mein bhi aa jata hai.

## Order form ko Google Sheet se jodna
`js/order.js` ke upar `ENTRY` mein har `entry.XXXX` ki jagah Google Form ke asli IDs likhein.
1. Google Form mein sawal rakhein: Your Name, Contact Number, Complete Address, City, Belt ka colour, Waist Size, aur ek naya "Product" (Belt/Wallet).
2. "Waist Size" ko required na rakhein (wallet ke liye size nahi hota).
3. Form ke 3 dots (⋮) > **Get pre-filled link** > sab sawalon mein test jawab > **Get link**.
4. Link mein `entry.123456=test` jaise hisse hon ge. Har sawal ka number `ENTRY` mein likh dein.

Jab tak IDs nahi bhare, order sirf WhatsApp par jata hai. Ek limit: browser Google ka jawab nahi dekh sakta, to agar Form kisi wajah se order reject kare to page ko pata nahi chalta. WhatsApp message phir bhi ja chuka hota hai.

## WhatsApp number
`js/order.js` mein `WA_NUMBER = '923458340235'` (country code ke saath, bina + aur bina 0 ke). `index.html` mein bhi `wa.me/923458340235` ek jagah hai.

## Delivery rule
Karachi: COD free. Baqi shehar: Rs. 300 aur advance payment (PostEx). Text `js/order.js` ke `note()` mein hai.

## GitHub Pages par chalana
1. Repo mein purani files delete karein (khaas kar `js/script.js`, `js/tailwind-config.js`, purana `images/` folder).
2. Is folder ki sab files upload karein (`index.html`, `css`, `js`, `assets`, `README.md`).
3. Settings > Pages > Branch: `main`, folder `/ (root)` > Save.
4. 1-2 minute baad link: `https://<username>.github.io/<repo>/`
