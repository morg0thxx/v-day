const gifStages = [
    "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif",    // 0 normal
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAd/chiikawa-hachiware.gif",  // 1 confused
    "https://media.tenor.com/f_rkpJbH1s8AAAAj/somsom1012.gif",             // 2 pleading
    "https://media.tenor.com/OGY9zdREsVAAAAAj/somsom1012.gif",             // 3 sad
    "https://media1.tenor.com/m/WGfra-Y_Ke0AAAAd/chiikawa-sad.gif",       // 4 sadder
    "https://media.tenor.com/CivArbX7NzQAAAAj/somsom1012.gif",             // 5 devastated
    "https://media.tenor.com/5_tv1HquZlcAAAAj/chiikawa.gif",               // 6 very devastated
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAC/chiikawa-hachiware.gif"  // 7 crying runaway
]

// Ganti teks noMessages jadi lebih santai & menyebalkan
const noMessages = [
    "No",
    "Wait, for real? 🤨",
    "Don't do me like that...",
    "I'll buy you snacks!! 🍟",
    "You're actually heartless lol",
    "STOOOPPPP 🛑",
    "You can't even click this anymore",
    "GAAA!! 😜",
    "Catch me if you can! LMAO"
];

const yesTeasePokes = [
    "Try clicking No first... I dare you 😏",
    "Bet you can't hit the No button 👀",
    "Go on, try to reject me 😈",
    "You're missing the fun part!"
];

// ... (kode audio & toggleMusic tetap sama)

function handleNoClick() {
    noClickCount++;

    const msgIndex = Math.min(noClickCount, noMessages.length - 1);
    noBtn.textContent = noMessages[msgIndex];

    // Yes button makin rakus (makin gede)
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = `${currentSize * 1.4}px`; // Lebih cepat gedenya
    
    // Swap GIF
    const gifIndex = Math.min(noClickCount, gifStages.length - 1);
    swapGif(gifStages[gifIndex]);

    // Aktifkan mode lari lebih awal (klik ke-3) biar makin kesel
    if (noClickCount >= 3 && !runawayEnabled) {
        enableRunaway();
        runawayEnabled = true;
    }
}

function enableRunaway() {
    // Pemicu lari: kursor mendekat (mouseover) atau disentuh (touchstart)
    noBtn.addEventListener('mouseover', runAway);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Biar gak bisa diklik di HP
        runAway();
    });
}

function runAway() {
    // Bikin areanya lebih luas tapi tetap di dalam layar
    const padding = 50;
    const btnW = noBtn.offsetWidth;
    const btnH = noBtn.offsetHeight;
    
    // Logika lari: cari koordinat random yang jauh dari posisi sekarang
    let randomX = Math.random() * (window.innerWidth - btnW - padding);
    let randomY = Math.random() * (window.innerHeight - btnH - padding);

    // Tambahkan transisi smooth biar kelihatan "licin"
    noBtn.style.transition = 'all 0.2s ease-out'; 
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.zIndex = '999';

    // Efek tambahan: tombol No kadang mengecil sendiri tiap lari
    const currentNoSize = parseFloat(window.getComputedStyle(noBtn).fontSize);
    if (currentNoSize > 8) {
        noBtn.style.fontSize = `${currentNoSize * 0.9}px`;
    }
}
// ... (sisanya tetap sama)
