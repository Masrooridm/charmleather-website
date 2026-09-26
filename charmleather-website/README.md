# CharmLeather Landing Page

## Apni product photos add karna

`js/script.js` file kholo (Notepad ya koi bhi text/code editor se) — sabse upar likha hai:

```
const PRODUCTS = [
    {
        id: "reversible",
        name: "Reversible Dual-Tone Belt",
        ...
        photo: null
    },
    ...
];
```

Apni photo add karne ke 2 steps:

1. Is HTML file ke **sath wale folder** mein ek naya folder banao naam `images`, aur apni product photo us mein daal do (e.g. `images/reversible-belt.jpg`)
2. `js/script.js` mein us product ki `photo: null` line ko badal kar likho:
   ```
   photo: "images/reversible-belt.jpg"
   ```

Bas — save karo, page refresh karo, aapki real photo dikhne lag jayegi (icon illustration ki jagah). Design, animation, kisi aur cheez ko chhedne ki zaroorat nahi.

Yehi tareeqa teeno products (Reversible Belt, Auto-Lock Belt, Gift Combo) ke liye kaam karega — har ek ka apna `photo:` field hai.

**Naya product add karna ho to**: `PRODUCTS` array mein `{ ... }` ka ek aur block copy-paste kar ke apni details daal do — website automatically naya card bana degi.

---

## GitHub par publish karna

1. [github.com](https://github.com) par account banao (agar nahi hai)
2. "+" > "New repository" > naam do (e.g. `charmleather-website`) > Public > Create
3. Repository page par "uploading an existing file" click karo
4. Is poore folder ki sab files ek sath drag & drop karo — `index.html`, `css` folder, `js` folder, aur `images` folder (jo aapne apni photos ke sath banaya) — "Commit changes" dabao
5. Settings > Pages > Branch: `main`, folder `/ (root)` > Save
6. 1-2 minute baad live link mil jayegi: `https://<username>.github.io/<repository-naam>/`

## WhatsApp number badalna

`js/script.js` file mein sabse upar:
```
const WHATSAPP_NUMBER = "923458340235";
```
Yahan apna number country code ke sath, bina + aur bina leading 0 ke likho.
