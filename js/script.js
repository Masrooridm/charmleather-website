        /* =====================================================================
           CharmLeather — PRODUCT DATA
           =====================================================================
           EDIT YOUR PRODUCTS HERE. This is the ONLY place you need to touch
           to add a product, change a price, or use your own photo.

           HOW TO ADD YOUR OWN PHOTOS:
           1. Put your photo file next to this HTML file, inside a folder
              named "images" (e.g. images/auto-lock-black.jpg)
           2. Set "photo" below to that path, e.g. "images/auto-lock-black.jpg"
           3. Leave "photo" as null to keep the built-in icon illustration.

           APNI PHOTO ADD KARNE KA TAREEQA (Roman Urdu):
           1. Is HTML file ke sath ek folder banao naam "images" (agar pehle
              se nahi hai), aur apni product photo us mein daal do
              (misaal: images/auto-lock-black.jpg)
           2. Neeche jis product ki photo lagani hai, uski "photo" line mein
              apni file ka naam likho: photo: "images/auto-lock-black.jpg"
           3. Agar photo nahi lagani (abhi ke liye icon hi rehne dena) to
              "photo" ko null hi rehne do — waisa hi jaisa neeche hai.
           4. Save karo aur file refresh/upload kar do, photo apne aap
              product card mein dikhne lag jayegi. Design ya code ki koi
              aur line chhedne ki zaroorat nahi.
           ===================================================================== */
        const WHATSAPP_NUMBER = "923458340235"; // country code + number, no spaces, no +, no leading 0

        const PRODUCTS = [
            {
                id: "reversible",
                name: "Reversible Dual-Tone Belt",
                tagline: "Black & Tan Dual Leather • 180° Twist Buckle",
                description: "Switch seamlessly between formal black and casual tan with a solid metallic pin buckle.",
                price: 2500,
                originalPrice: 3200,
                badge: "2-in-1 Design",
                icon: "reversible",
                photo: "images/reversible.jpeg"
            },
            {
                id: "autolock",
                name: "Auto-Lock Ratchet Belt",
                tagline: "No Punched Holes • Precision Track Mechanism",
                description: "An internal 32-position track adjusts in millimeter increments for a perfect fit, every time.",
                price: 2500,
                originalPrice: 3200,
                badge: "Micro-Adjust",
                icon: "ratchet",
                photo: "images/autolock.jpeg"
            },
            {
                id: "combo",
                name: "Belt & Wallet Gift Combo",
                tagline: "Reversible Belt + Bifold Leather Wallet",
                description: "A gift set packed in a CharmLeather presentation box — belt and matching wallet together.",
                price: 3999,
                originalPrice: 5000,
                badge: "Gift Box",
                icon: "combo",
                photo: "images/combo.jpeg"
            }
        ];

        /* =====================================================================
           CharmLeather — REVIEWS
           =====================================================================
           These three are PLACEHOLDER reviews (initials only, no name, no city,
           no "Verified Buyer" claim) so the page isn't shipped with invented
           testimonials attributed to real-sounding people. Once you have real
           customer feedback (a WhatsApp message, a comment, a DM), replace the
           entries below with the real quote and the customer's real first name
           and city — only if they're okay with being named.
           ===================================================================== */
        const REVIEWS = [
            { initials: "?", text: "Add a real customer quote here once you have one.", name: "Customer name", place: "City" },
            { initials: "?", text: "Add a real customer quote here once you have one.", name: "Customer name", place: "City" },
            { initials: "?", text: "Add a real customer quote here once you have one.", name: "Customer name", place: "City" }
        ];

        function renderReviews() {
            const grid = document.getElementById('reviewsGrid');
            if (!grid) return;
            grid.innerHTML = REVIEWS.map(r => `
                <div class="glass-card p-6 rounded-2xl border border-gray-800 tilt-3d reveal-3d">
                    <p class="text-gray-300 text-xs leading-relaxed mb-4">"${r.text}"</p>
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-brand-gold/20 text-brand-gold font-bold flex items-center justify-center text-xs border border-brand-gold/40">${r.initials}</div>
                        <div>
                            <p class="text-xs font-bold text-white">${r.name}</p>
                            <p class="text-[10px] text-gray-500">${r.place}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Web Audio API Sound Effects Generator
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        function playClickSound(freq = 600, duration = 0.05) {
            try {
                if (audioCtx.state === 'suspended') {
                    audioCtx.resume();
                }
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start();
                osc.stop(audioCtx.currentTime + duration);
            } catch(e) {}
        }

        // 3D Belt Flip Mechanics
        const beltCard = document.getElementById('belt3dCard');
        const flipBtn = document.getElementById('flipBeltBtn');
        const simBadge = document.getElementById('simStatusBadge');
        const heroBeltSvg = document.getElementById('heroBeltSvg');
        const svgStrap = document.getElementById('svgStrap');

        let isFlipped = false;

        function toggleBeltFlip() {
            playClickSound(800, 0.08);
            isFlipped = !isFlipped;
            if (isFlipped) {
                beltCard.classList.add('belt-flipped');
                simBadge.innerText = 'CURRENT MODE: CASUAL RICH TAN';
                simBadge.className = 'inline-block px-3 py-1 rounded-md bg-amber-900 text-amber-200 text-xs font-bold border border-amber-500';
                if(svgStrap) svgStrap.setAttribute('stroke', '#8A4B12');
            } else {
                beltCard.classList.remove('belt-flipped');
                simBadge.innerText = 'CURRENT MODE: FORMAL SLEEK BLACK';
                simBadge.className = 'inline-block px-3 py-1 rounded-md bg-black text-brand-gold text-xs font-bold border border-brand-gold/30';
                if(svgStrap) svgStrap.setAttribute('stroke', '#1A1A1A');
            }
        }

        if(beltCard) beltCard.addEventListener('click', toggleBeltFlip);
        if(flipBtn) flipBtn.addEventListener('click', toggleBeltFlip);

        // Auto-Lock Ratchet Mechanism Interactive Visualizer
        const ratchetSlider = document.getElementById('ratchetSlider');
        const ratchetPosText = document.getElementById('ratchetPosText');
        const ratchetBucklePin = document.getElementById('ratchetBucklePin');
        const ratchetTrackVisual = document.getElementById('ratchetTrackVisual');

        if(ratchetTrackVisual) {
            for(let i=0; i<32; i++) {
                const tooth = document.createElement('div');
                tooth.className = 'w-1 h-2 bg-brand-gold/50 rounded-sm';
                ratchetTrackVisual.appendChild(tooth);
            }
        }

        if(ratchetSlider) {
            ratchetSlider.addEventListener('input', (e) => {
                const val = e.target.value;
                const percentage = ((val - 1) / 31) * 85;
                ratchetBucklePin.style.left = `${percentage}%`;
                ratchetPosText.innerText = `Notch #${val} (Micro-Fit)`;
                playClickSound(400 + (val * 15), 0.02);
            });
        }

        // Mobile Menu Drawer Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileDrawer = document.getElementById('mobileDrawer');

        if(mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                const open = mobileDrawer.classList.toggle('hidden') === false;
                mobileMenuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
            });
        }

        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.add('hidden');
            });
        });

        // Product Selector Helper
        function selectProductAndScroll(productId) {
            const select = document.getElementById('productSelect');
            select.value = productId;
            updatePriceSummary();
            document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
        }

        // Form Price Calculator
        function updatePriceSummary() {
            const select = document.getElementById('productSelect');
            const product = PRODUCTS.find(p => p.id === select.value) || PRODUCTS[0];
            const formatted = 'Rs. ' + product.price.toLocaleString();
            document.getElementById('summaryProductPrice').innerText = formatted;
            document.getElementById('summaryTotalPrice').innerText = formatted;
        }

        // Render product cards + the order form's dropdown from PRODUCTS (single source of truth)
        function productIconSVG(icon) {
            if (icon === 'ratchet') {
                return `<svg class="w-3/4 h-3/4 transition-transform group-hover:scale-105 duration-500" viewBox="0 0 200 200" fill="none">
                    <rect x="30" y="85" width="140" height="30" rx="4" fill="#18181B" stroke="#27272A"/>
                    <path d="M 60,95 L 130,95" stroke="#D4AF37" stroke-width="4" stroke-dasharray="4 3"/>
                    <rect x="120" y="75" width="50" height="50" rx="8" fill="url(#goldGradP2)"/>
                    <rect x="130" y="85" width="30" height="30" rx="4" fill="#000"/>
                </svg>`;
            }
            if (icon === 'combo') {
                return `<svg class="w-3/4 h-3/4 transition-transform group-hover:scale-105 duration-500" viewBox="0 0 200 200" fill="none">
                    <rect x="25" y="35" width="150" height="130" rx="12" fill="#121215" stroke="#D4AF37" stroke-width="2"/>
                    <rect x="40" y="55" width="55" height="40" rx="4" fill="#27272A" stroke="#D4AF37"/>
                    <circle cx="130" cy="110" r="30" stroke="#27272A" stroke-width="14"/>
                    <circle cx="130" cy="110" r="30" stroke="#D4AF37" stroke-width="2" stroke-dasharray="6 4"/>
                </svg>`;
            }
            // default: reversible
            return `<svg class="w-3/4 h-3/4 transition-transform group-hover:scale-105 duration-500" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="70" stroke="#1E1E24" stroke-width="24"/>
                <circle cx="100" cy="100" r="70" stroke="#D4AF37" stroke-width="3" stroke-dasharray="10 6"/>
                <rect x="75" y="45" width="50" height="35" rx="6" fill="url(#goldGradP1)" stroke="#FFF"/>
            </svg>`;
        }

        function renderProducts() {
            const grid = document.getElementById('productsGrid');
            const select = document.getElementById('productSelect');

            grid.innerHTML = PRODUCTS.map((p, i) => `
                <div class="glass-card glass-card-hover rounded-3xl p-6 flex flex-col justify-between relative group tilt-3d reveal-3d ${i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}">
                    <div class="absolute top-4 left-4 bg-brand-gold text-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">${p.badge}</div>
                    <div>
                        <div class="aspect-square bg-black/60 rounded-2xl mb-6 overflow-hidden relative flex items-center justify-center border border-gray-800">
                            ${p.photo ? `<img src="${p.photo}" alt="${p.name}" class="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500">` : productIconSVG(p.icon)}
                        </div>
                        <h3 class="text-xl font-bold text-white mb-1">${p.name}</h3>
                        <p class="text-xs text-brand-gold font-medium mb-3">${p.tagline}</p>
                        <p class="text-gray-400 text-xs leading-relaxed mb-4">${p.description}</p>
                    </div>
                    <div class="pt-4 border-t border-gray-800 flex items-center justify-between">
                        <div>
                            ${p.originalPrice ? `<span class="text-xs text-gray-500 line-through">Rs. ${p.originalPrice.toLocaleString()}</span>` : ''}
                            <p class="text-xl font-bold text-white">Rs. ${p.price.toLocaleString()}</p>
                        </div>
                        <button onclick="selectProductAndScroll('${p.id}')" class="gold-btn px-4 py-2.5 rounded-xl font-bold text-xs uppercase">Buy Now</button>
                    </div>
                </div>
            `).join('');

            select.innerHTML = PRODUCTS.map(p =>
                `<option value="${p.id}">${p.name} — Rs. ${p.price.toLocaleString()}</option>`
            ).join('');

            // sync the hero / sticky-bar price displays to the first product so there's one source of truth
            document.querySelectorAll('.js-hero-price').forEach(el => el.textContent = 'Rs. ' + PRODUCTS[0].price.toLocaleString());

            updatePriceSummary();
        }

        // Form Submission
        function handleFormSubmit(e) {
            e.preventDefault();
            document.getElementById('successModal').classList.remove('hidden');
        }

        function closeModal() {
            document.getElementById('successModal').classList.add('hidden');
        }

        // WhatsApp Direct Link Generator
        function orderViaWhatsApp() {
            const name = document.getElementById('custName').value || 'Customer';
            const phone = document.getElementById('custPhone').value || 'N/A';
            const city = document.getElementById('custCity').value || 'N/A';
            const address = document.getElementById('custAddress').value || 'N/A';
            const size = document.getElementById('custSize').value;
            const product = PRODUCTS.find(p => p.id === document.getElementById('productSelect').value) || PRODUCTS[0];

            const message = `*NEW ORDER - CHARMLEATHER*%0A%0A` +
                `*Product:* ${product.name}%0A` +
                `*Price:* Rs. ${product.price.toLocaleString()}%0A` +
                `*Waist Size:* ${size}%0A%0A` +
                `*Customer Details:*%0A` +
                `• Name: ${name}%0A` +
                `• Phone: ${phone}%0A` +
                `• City: ${city}%0A` +
                `• Address: ${address}%0A%0A` +
                `*Payment:* Cash On Delivery`;

            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
            window.open(whatsappUrl, '_blank');
        }

        // =====================================================================
        // 3D ANIMATION LAYER
        // Cursor-tilt on cards (.tilt-3d) + scroll-in reveal (.reveal-3d)
        // =====================================================================
        function initTilt3D(root = document) {
            root.querySelectorAll('.tilt-3d').forEach(card => {
                if (card.dataset.tiltBound) return; // don't double-bind on re-render
                card.dataset.tiltBound = "true";

                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const midX = rect.width / 2;
                    const midY = rect.height / 2;
                    const rotateY = ((x - midX) / midX) * 8;   // left/right tilt
                    const rotateX = ((midY - y) / midY) * 8;   // up/down tilt
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
                });
            });
        }

        function initReveal3D(root = document) {
            const targets = root.querySelectorAll('.reveal-3d:not(.in-view)');
            if (!('IntersectionObserver' in window)) {
                targets.forEach(el => el.classList.add('in-view'));
                return;
            }
            const io = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        io.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });
            targets.forEach(el => io.observe(el));
        }

        // Run everything once the page is ready
        document.addEventListener('DOMContentLoaded', () => {
            renderProducts();   // builds the product cards (must run before initTilt3D/initReveal3D)
            renderReviews();    // builds the review cards
            initTilt3D();       // cursor-tilt effect on every .tilt-3d card, static + just-rendered
            initReveal3D();     // scroll-in 3D reveal on every .reveal-3d element, static + just-rendered
        });
