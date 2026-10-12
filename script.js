const products = [
  {id:1,name:"Honey Oat Latte",desc:"Espresso, oat milk, a touch of honey",price:220,category:"Hot",tag:"Bestseller",image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=85"},
  {id:2,name:"Iced Vanilla Cloud",desc:"Cold brew, vanilla, silky cold foam",price:240,category:"Cold",tag:"Customer favourite",image:"https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=85"},
  {id:3,name:"Classic Cappuccino",desc:"Rich espresso with soft milk foam",price:180,category:"Hot",tag:"A classic",image:"https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=85"},
  {id:4,name:"Brown Sugar Shaker",desc:"Iced espresso, brown sugar, cinnamon",price:250,category:"Cold",tag:"New in",image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=85"},
  {id:5,name:"Matcha Mellow",desc:"Earthy matcha with creamy oat milk",price:230,category:"Tea",tag:"Little green glow",image:"https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=800&q=85"},
  {id:6,name:"Dark Mocha",desc:"Velvety chocolate meets bold espresso",price:210,category:"Hot",tag:"For chocolate lovers",image:"https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=800&q=85"}
];
let cart = [];
const grid = document.getElementById("productGrid");
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const toast = document.getElementById("toast");
let toastTimer;

function money(amount){ return "₹" + amount.toLocaleString("en-IN"); }
function renderProducts(category="All"){
  const visible = category === "All" ? products : products.filter(p=>p.category===category);
  grid.innerHTML = visible.map(p=>`
    <article class="product-card">
      <div class="product-photo"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-tag">${p.tag}</span><button class="add-button" data-add="${p.id}" aria-label="Add ${p.name} to bag">+</button></div>
      <div class="product-info"><div><h3>${p.name}</h3><p>${p.desc}</p></div><span class="product-price">${money(p.price)}</span></div>
    </article>`).join("");
}
function addToCart(id){
  const found=cart.find(item=>item.id===id);
  if(found) found.qty++; else cart.push({...products.find(p=>p.id===id),qty:1});
  renderCart(); showToast("Added to your bag ✓");
}
function updateQty(id,delta){
  const item=cart.find(p=>p.id===id); if(!item)return;
  item.qty+=delta; if(item.qty<=0)cart=cart.filter(p=>p.id!==id);
  renderCart();
}
function renderCart(){
  const count=cart.reduce((sum,p)=>sum+p.qty,0);
  const total=cart.reduce((sum,p)=>sum+p.price*p.qty,0);
  document.getElementById("cartCount").textContent=count;
  document.getElementById("drawerCount").textContent=`(${count})`;
  document.getElementById("subtotal").textContent=money(total);
  const items=document.getElementById("cartItems");
  if(!cart.length){items.innerHTML='<div class="empty-cart"><span>☕</span><h3>Your bag is looking lonely.</h3><p>Add something delicious to get started.</p></div>';return;}
  items.innerHTML=cart.map(p=>`<div class="cart-row"><img src="${p.image}" alt=""><div><h4>${p.name}</h4><p>${money(p.price)} each</p><div class="qty-controls"><button data-qty="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button><span>${p.qty}</span><button data-qty="${p.id}" data-delta="1" aria-label="Increase quantity">+</button></div><button class="remove-item" data-remove="${p.id}">Remove</button></div><strong>${money(p.price*p.qty)}</strong></div>`).join("");
}
function openCart(){cartDrawer.classList.add("open");overlay.classList.add("open");document.body.style.overflow="hidden";}
function closeCart(){cartDrawer.classList.remove("open");overlay.classList.remove("open");document.body.style.overflow="";}
function showToast(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2200);}
grid.addEventListener("click",e=>{const btn=e.target.closest("[data-add]");if(btn)addToCart(Number(btn.dataset.add));});
document.querySelectorAll(".category").forEach(btn=>btn.addEventListener("click",()=>{document.querySelector(".category.active").classList.remove("active");btn.classList.add("active");renderProducts(btn.dataset.category);}));
document.getElementById("cartOpen").addEventListener("click",openCart);
document.getElementById("cartClose").addEventListener("click",closeCart);
overlay.addEventListener("click",closeCart);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart();});
document.getElementById("cartItems").addEventListener("click",e=>{
  const qty=e.target.closest("[data-qty]");const remove=e.target.closest("[data-remove]");
  if(qty)updateQty(Number(qty.dataset.qty),Number(qty.dataset.delta));
  if(remove){cart=cart.filter(p=>p.id!==Number(remove.dataset.remove));renderCart();}
});
document.getElementById("checkoutButton").addEventListener("click",()=>{
  if(!cart.length){showToast("Your bag is empty — pick a favourite first.");return;}
  const orderTotal=cart.reduce((sum,p)=>sum+p.price*p.qty,0);
  alert(`Thanks for choosing Brew & Bean!\\n\\nYour demo order total is ${money(orderTotal)}.\\nThis is a frontend demo, so no payment was taken.`);
  cart=[];renderCart();closeCart();showToast("Demo order placed. Have a lovely day!");
});
renderProducts();renderCart();


// Brew AI: transparent, local recommendation logic — no API key required.
let selectedTemp = "any";
document.getElementById("temperatureChoices").addEventListener("click", event => {
  const btn = event.target.closest("[data-temp]");
  if (!btn) return;
  selectedTemp = btn.dataset.temp;
  document.querySelectorAll(".choice").forEach(choice => choice.classList.toggle("active", choice === btn));
});

document.getElementById("recommendButton").addEventListener("click", () => {
  const mood = document.getElementById("moodSelect").value;
  const pool = products.filter(p => selectedTemp === "any" || p.category === selectedTemp || (selectedTemp === "Hot" && p.category === "Tea"));
  const rules = {
    focused: ["Classic Cappuccino", "Bold and balanced — a familiar espresso-led cup for your focus session."],
    cozy: ["Honey Oat Latte", "Soft oat milk and a little honey make this one feel like a warm blanket."],
    refreshed: ["Iced Vanilla Cloud", "Cool, creamy and refreshing — a little reset in a glass."],
    treat: ["Dark Mocha", "Chocolate and espresso are a very good reason to take a break."],
    gentle: ["Matcha Mellow", "A smooth, earthy matcha option for a gentler kind of sip."]
  };
  let match = products.find(p => p.name === rules[mood][0] && pool.some(item => item.id === p.id));
  if (!match) {
    const moodFallback = {focused:"Classic Cappuccino",cozy:"Honey Oat Latte",refreshed:"Iced Vanilla Cloud",treat:"Dark Mocha",gentle:"Matcha Mellow"};
    match = pool.find(p => p.name === moodFallback[mood]) || pool[0] || products[0];
  }
  const note = match.name === rules[mood][0] ? rules[mood][1] : `Based on your mood and ${selectedTemp === "any" ? "open-minded" : selectedTemp.toLowerCase()} preference, this is a lovely place to start.`;
  const result = document.getElementById("aiResult");
  result.innerHTML = `<span class="result-icon">☕</span><div><small>YOUR BREW AI MATCH</small><p class="result-title">${match.name} · ${money(match.price)}</p><p>${note}</p><button type="button" data-ai-add="${match.id}">Add this to my bag →</button></div>`;
});
document.getElementById("aiResult").addEventListener("click", event => {
  const btn = event.target.closest("[data-ai-add]");
  if (btn) addToCart(Number(btn.dataset.aiAdd));
});
