import React, { useState, useEffect, useMemo } from "react";
import "./App.css";

const STORAGE_KEY = "pro_football_prime_clubs_v3";

const CLUB_LOGOS = {
  "FC Barcelona":
    "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/paYnEE8hcrP96neHRNofhQ_500x500.png",
  "Real Madrid CF":
    "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/Th4fAVAZeCJWRcKoLW7koA_500x500.png",
  "Manchester City":
    "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/z44l-a0W1v5FmgPnemV6Xw_500x500.png",
  "Paris Saint-Germain":
    "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/mcpMspef1hwHwi9qrfp4YQ_500x500.png",
  "İstanbul Başakşehir":
    "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/EGmgZP8L9j16Fp73CFnvMw_500x500.png"
};

const INITIAL_PLAYERS = [
  {
    id: 1,
    name: "Lionel Messi",
    username: "leomessi",
    email: "leo.messi@fcbarcelona.cat",
    number: 10,
    position: "RW / CF",
    rating: 96,
    primeEra: "PRIME 2012",
    flag: "🇦🇷",
    theme: "linear-gradient(135deg, #004d98 0%, #a50044 100%)",
    stats: { pac: 93, sho: 95, pas: 94, dri: 98 },
    avatar: "",
    address: {
      street: "Carrer d'Arístides Maillol",
      suite: "Camp Nou 10",
      city: "Barcelona",
      zipcode: "08028"
    },
    phone: "+34-93-496-3600",
    website: "fcbarcelona.com",
    company: {
      name: "FC Barcelona",
      catchPhrase: "91 goals in 2012 • Prime Camp Nou Legend",
      bs: "orchestrate world-class playmaking & finishing"
    }
  },
  {
    id: 2,
    name: "Cristiano Ronaldo",
    username: "cristiano",
    email: "cr7@realmadrid.es",
    number: 7,
    position: "LW / ST",
    rating: 95,
    primeEra: "PRIME 2016–17",
    flag: "🇵🇹",
    theme: "linear-gradient(135deg, #1e293b 0%, #eab308 100%)",
    stats: { pac: 93, sho: 96, pas: 84, dri: 91 },
    avatar: "",
    address: {
      street: "Calle de Concha Espina",
      suite: "Bernabéu 7",
      city: "Madrid",
      zipcode: "28036"
    },
    phone: "+34-91-398-4300",
    website: "realmadrid.com",
    company: {
      name: "Real Madrid CF",
      catchPhrase: "450 goals in 438 matches • UCL King",
      bs: "dominate big-game aerial & long-range scoring"
    }
  },
  {
    id: 3,
    name: "Neymar Jr",
    username: "neymarjr",
    email: "neymar@fcbarcelona.cat",
    number: 11,
    position: "LW",
    rating: 93,
    primeEra: "PRIME 2015",
    flag: "🇧🇷",
    theme: "linear-gradient(135deg, #004d98 0%, #a50044 100%)",
    stats: { pac: 93, sho: 88, pas: 88, dri: 96 },
    avatar: "",
    address: {
      street: "Carrer d'Arístides Maillol",
      suite: "Camp Nou 11",
      city: "Barcelona",
      zipcode: "08028"
    },
    phone: "+34-93-555-1111",
    website: "fcbarcelona.com",
    company: {
      name: "FC Barcelona",
      catchPhrase: "2015 Treble Winner • MSN Joga Bonito",
      bs: "dismantle defenses with Samba flair"
    }
  },
  {
    id: 4,
    name: "Kylian Mbappé",
    username: "k.mbappe",
    email: "kylian@psg.fr",
    number: 7,
    position: "LW / ST",
    rating: 92,
    primeEra: "PRIME 2022",
    flag: "🇫🇷",
    theme: "linear-gradient(135deg, #004170 0%, #da291c 100%)",
    stats: { pac: 97, sho: 91, pas: 82, dri: 93 },
    avatar: "",
    address: {
      street: "24 Rue du Commandant Guilbaud",
      suite: "Parc des Princes 7",
      city: "Paris",
      zipcode: "75016"
    },
    phone: "+33-1-47-43-7171",
    website: "psg.fr",
    company: {
      name: "Paris Saint-Germain",
      catchPhrase: "All-time PSG top scorer & World Cup icon",
      bs: "accelerate lethal counter-attacking sprints"
    }
  },
  {
    id: 5,
    name: "Kevin De Bruyne",
    username: "kevindebruyne",
    email: "kdb@mancity.com",
    number: 17,
    position: "CAM",
    rating: 92,
    primeEra: "PRIME 2023",
    flag: "🇧🇪",
    theme: "linear-gradient(135deg, #0284c7 0%, #0f172a 100%)",
    stats: { pac: 76, sho: 89, pas: 96, dri: 88 },
    avatar: "",
    address: {
      street: "Etihad Campus",
      suite: "Suite 17",
      city: "Manchester",
      zipcode: "M11 3FF"
    },
    phone: "+44-161-444-1894",
    website: "mancity.com",
    company: {
      name: "Manchester City",
      catchPhrase: "6x Premier League Champion & Assist King",
      bs: "engineer surgical through-balls"
    }
  },
  {
    id: 6,
    name: "Erling Haaland",
    username: "erling.haaland",
    email: "haaland@mancity.com",
    number: 9,
    position: "ST",
    rating: 92,
    primeEra: "PRIME 2023",
    flag: "🇳🇴",
    theme: "linear-gradient(135deg, #0284c7 0%, #0f172a 100%)",
    stats: { pac: 89, sho: 94, pas: 70, dri: 81 },
    avatar: "",
    address: {
      street: "Etihad Campus",
      suite: "Suite 9",
      city: "Manchester",
      zipcode: "M11 3FF"
    },
    phone: "+44-161-555-0900",
    website: "mancity.com",
    company: {
      name: "Manchester City",
      catchPhrase: "Treble Winner • Unstoppable Nordic Striker",
      bs: "dominate penalty-box efficiency"
    }
  },
  {
    id: 7,
    name: "Vinícius Júnior",
    username: "vinijr",
    email: "vini.jr@realmadrid.es",
    number: 7,
    position: "LW",
    rating: 91,
    primeEra: "PRIME 2024",
    flag: "🇧🇷",
    theme: "linear-gradient(135deg, #1e293b 0%, #eab308 100%)",
    stats: { pac: 95, sho: 85, pas: 83, dri: 94 },
    avatar: "",
    address: {
      street: "Calle de Concha Espina",
      suite: "Bernabéu 7",
      city: "Madrid",
      zipcode: "28036"
    },
    phone: "+34-91-555-0777",
    website: "realmadrid.com",
    company: {
      name: "Real Madrid CF",
      catchPhrase: "Electric UCL-winning left winger",
      bs: "unlock high-tempo flank transitions"
    }
  },
  {
    id: 8,
    name: "Jude Bellingham",
    username: "judebellingham",
    email: "jude@realmadrid.es",
    number: 5,
    position: "CAM / CM",
    rating: 91,
    primeEra: "PRIME 2024",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    theme: "linear-gradient(135deg, #1e293b 0%, #eab308 100%)",
    stats: { pac: 82, sho: 88, pas: 86, dri: 90 },
    avatar: "",
    address: {
      street: "Calle de Concha Espina",
      suite: "Bernabéu 5",
      city: "Madrid",
      zipcode: "28036"
    },
    phone: "+34-91-555-0505",
    website: "realmadrid.com",
    company: {
      name: "Real Madrid CF",
      catchPhrase: "Complete box-to-box clutch leader",
      bs: "control midfield tempo & late arrivals"
    }
  },
  {
    id: 9,
    name: "Lamine Yamal",
    username: "lamineyamal",
    email: "lamine@fcbarcelona.cat",
    number: 19,
    position: "RW",
    rating: 90,
    primeEra: "PRIME 2026",
    flag: "🇪🇸",
    theme: "linear-gradient(135deg, #004d98 0%, #a50044 100%)",
    stats: { pac: 89, sho: 83, pas: 87, dri: 94 },
    avatar: "",
    address: {
      street: "Carrer d'Arístides Maillol",
      suite: "Camp Nou 19",
      city: "Barcelona",
      zipcode: "08028"
    },
    phone: "+34-93-555-1919",
    website: "fcbarcelona.com",
    company: {
      name: "FC Barcelona",
      catchPhrase: "La Masia golden prodigy",
      bs: "innovate inverted right-wing dribbling"
    }
  },
  {
    id: 10,
    name: "Pedri González",
    username: "pedri",
    email: "pedri@fcbarcelona.cat",
    number: 8,
    position: "CM",
    rating: 89,
    primeEra: "PRIME 2026",
    flag: "🇪🇸",
    theme: "linear-gradient(135deg, #004d98 0%, #a50044 100%)",
    stats: { pac: 79, sho: 75, pas: 90, dri: 92 },
    avatar: "",
    address: {
      street: "Carrer d'Arístides Maillol",
      suite: "Camp Nou 8",
      city: "Barcelona",
      zipcode: "08028"
    },
    phone: "+34-93-555-0808",
    website: "fcbarcelona.com",
    company: {
      name: "FC Barcelona",
      catchPhrase: "Midfield tempo & vision maestro",
      bs: "control possession under high press"
    }
  },
  {
    id: 11,
    name: "Abdukodir Khusanov",
    username: "abdukodir_khusanov",
    email: "khusanov@mancity.com",
    number: 45,
    position: "CB",
    rating: 86,
    primeEra: "PRIME 2026",
    flag: "🇺🇿",
    theme: "linear-gradient(135deg, #0284c7 0%, #059669 100%)",
    stats: { pac: 87, sho: 56, pas: 77, dri: 75 },
    avatar: "",
    address: {
      street: "Etihad Campus",
      suite: "Apt. 45",
      city: "Manchester",
      zipcode: "M11 3FF"
    },
    phone: "+998-71-555-4545",
    website: "mancity.com",
    company: {
      name: "Manchester City",
      catchPhrase: "FA Cup & EFL Cup Winner • Uzbek Wall",
      bs: "lock down high-line defensive transitions"
    }
  },
  {
    id: 12,
    name: "Eldor Shomurodov",
    username: "eldor_shomurodov",
    email: "eldor@ibfk.com.tr",
    number: 14,
    position: "ST",
    rating: 85,
    primeEra: "PRIME 2025–26",
    flag: "🇺🇿",
    theme: "linear-gradient(135deg, #ea580c 0%, #1e3a8a 100%)",
    stats: { pac: 85, sho: 86, pas: 76, dri: 82 },
    avatar: "",
    address: {
      street: "Başakşehir Fatih Terim",
      suite: "Suite 14",
      city: "Istanbul",
      zipcode: "34480"
    },
    phone: "+998-71-555-1414",
    website: "ibfk.com.tr",
    company: {
      name: "İstanbul Başakşehir",
      catchPhrase: "23 goals in 2025/26 • Uzbekistan Captain",
      bs: "lead aerial duels and clinical finishing"
    }
  }
];

const translations = {
  uz: {
    title: "PRO FOOTBALL PRIME",
    subtitle: "Futbolchilarning eng kuchli (Prime) klublaridagi ma'lumotlar bazasi",
    searchPlaceholder: "Futbolchi, klub yoki shahar qidirish...",
    allClubs: "Barcha klublar",
    addPlayerBtn: "Futbolchi qo'shish",
    resetBtn: "Tiklash",
    details: "Batafsil",
    delete: "O'chirish",
    favorite: "Saralanganlarga qo'shish",
    noResults: "Hech qanday futbolchi topilmadi.",
    club: "Prime Klub",
    email: "Email",
    phone: "Telefon",
    address: "Manzil",
    website: "Veb-sayt",
    role: "O'yin uslubi",
    close: "Yopish",
    addNewPlayer: "Yangi futbolchi qo'shish",
    fullName: "Ism va familiya",
    username: "Username",
    city: "Shahar",
    position: "Pozitsiya",
    quoteLabel: "Prime yutuq / Ta'rif",
    avatarUrl: "Rasm URL (ixtiyoriy)",
    cancel: "Bekor qilish",
    savePlayer: "Saqlash",
    validationError: "Iltimos, futbolchi ismi va klubini kiriting!",
    confirmDelete: "rostdan ham o'chirilsinmi?",
    addedToast: "ro'yxatga qo'shildi!",
    deletedToast: "ro'yxatdan o'chirildi!",
    resetToast: "Prime ro'yxat tiklandi!",
    totalLabel: "Jami futbolchilar"
  },
  ru: {
    title: "PRO FOOTBALL PRIME",
    subtitle: "База данных футболистов в их лучших (Prime) клубах",
    searchPlaceholder: "Поиск игрока, клуба или города...",
    allClubs: "Все клубы",
    addPlayerBtn: "Добавить игрока",
    resetBtn: "Сброс",
    details: "Подробнее",
    delete: "Удалить",
    favorite: "В избранное",
    noResults: "Футболисты не найдены.",
    club: "Prime Клуб",
    email: "Эл. почта",
    phone: "Телефон",
    address: "Адрес",
    website: "Веб-сайт",
    role: "Стиль игры",
    close: "Закрыть",
    addNewPlayer: "Добавить нового игрока",
    fullName: "Имя и фамилия",
    username: "Никнейм",
    city: "Город",
    position: "Позиция",
    quoteLabel: "Достижение / Описание",
    avatarUrl: "URL фото (необязательно)",
    cancel: "Отмена",
    savePlayer: "Сохранить",
    validationError: "Пожалуйста, введите имя игрока и клуб!",
    confirmDelete: "действительно удалить?",
    addedToast: "добавлен в список!",
    deletedToast: "удален из списка!",
    resetToast: "Prime-список восстановлен!",
    totalLabel: "Всего игроков"
  },
  en: {
    title: "PRO FOOTBALL PRIME",
    subtitle: "Football icons at their peak Prime clubs",
    searchPlaceholder: "Search player, club, or city...",
    allClubs: "All Clubs",
    addPlayerBtn: "Add Player",
    resetBtn: "Reset",
    details: "View Profile",
    delete: "Delete",
    favorite: "Add to Favorites",
    noResults: "No players found.",
    club: "Prime Club",
    email: "Email",
    phone: "Phone",
    address: "Address",
    website: "Website",
    role: "Playstyle",
    close: "Close",
    addNewPlayer: "Add New Player",
    fullName: "Full Name",
    username: "Username",
    city: "City",
    position: "Position",
    quoteLabel: "Prime Highlight",
    avatarUrl: "Avatar URL (optional)",
    cancel: "Cancel",
    savePlayer: "Save Player",
    validationError: "Please enter player name and club!",
    confirmDelete: "are you sure you want to delete?",
    addedToast: "added to roster!",
    deletedToast: "removed from roster!",
    resetToast: "Prime roster restored!",
    totalLabel: "Total players"
  }
};

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function App() {
  const [players, setPlayers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_PLAYERS;
    } catch {
      return INITIAL_PLAYERS;
    }
  });

  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState("uz");
  const [search, setSearch] = useState("");
  const [selectedClub, setSelectedClub] = useState("ALL");
  const [favorites, setFavorites] = useState([1, 2, 11, 12]);
  const [showOnlyFavs, setShowOnlyFavs] = useState(false);
  const [activePlayer, setActivePlayer] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const [form, setForm] = useState({
    name: "",
    username: "",
    club: "",
    city: "",
    position: "ST",
    number: 10,
    rating: 88,
    email: "",
    phone: "",
    avatar: "",
    catchPhrase: ""
  });
  const [formError, setFormError] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
  }, [players]);

  const t = translations[lang];

  const triggerToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const clubs = useMemo(() => {
    const unique = new Set(players.map((p) => p.company.name));
    return ["ALL", ...Array.from(unique)];
  }, [players]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError("");
  };

  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.club.trim()) {
      setFormError(t.validationError);
      return;
    }

    const cleanUsername = (form.username || form.name.split(" ")[0])
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_");

    const newPlayer = {
      id: Date.now(),
      name: form.name.trim(),
      username: cleanUsername,
      email: form.email.trim() || `${cleanUsername}@club.com`,
      number: Number(form.number) || 10,
      position: form.position || "ST",
      rating: Math.min(99, Math.max(50, Number(form.rating) || 85)),
      primeEra: "PRIME 2026",
      flag: "⚽",
      theme: "linear-gradient(135deg, #059669 0%, #0f172a 100%)",
      stats: { pac: 86, sho: 85, pas: 83, dri: 87 },
      avatar: form.avatar.trim(),
      address: {
        street: "Stadium Boulevard",
        suite: `Suite ${form.number || 1}`,
        city: form.city.trim() || "Tashkent",
        zipcode: "100000"
      },
      phone: form.phone.trim() || "+998-90-000-00-00",
      website: "fifa.com",
      company: {
        name: form.club.trim(),
        catchPhrase: form.catchPhrase.trim() || "Rising football talent",
        bs: "deliver high-impact performance"
      }
    };

    setPlayers((prev) => [newPlayer, ...prev]);
    setForm({
      name: "",
      username: "",
      club: "",
      city: "",
      position: "ST",
      number: 10,
      rating: 88,
      email: "",
      phone: "",
      avatar: "",
      catchPhrase: ""
    });
    setIsAddModalOpen(false);
    triggerToast(`${newPlayer.name} ${t.addedToast}`, "success");
  };

  const handleDeletePlayer = (id, name) => {
    if (window.confirm(`${name} — ${t.confirmDelete}`)) {
      setPlayers((prev) => prev.filter((p) => p.id !== id));
      setFavorites((prev) => prev.filter((favId) => favId !== id));
      if (activePlayer?.id === id) setActivePlayer(null);
      triggerToast(`${name} ${t.deletedToast}`, "danger");
    }
  };

  const handleReset = () => {
    setPlayers(INITIAL_PLAYERS);
    localStorage.removeItem(STORAGE_KEY);
    setSelectedClub("ALL");
    triggerToast(t.resetToast, "success");
  };

  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchesSearch =
        player.name.toLowerCase().includes(search.toLowerCase()) ||
        player.company.name.toLowerCase().includes(search.toLowerCase()) ||
        player.address.city.toLowerCase().includes(search.toLowerCase());

      const matchesClub =
        selectedClub === "ALL" || player.company.name === selectedClub;

      const matchesFav = !showOnlyFavs || favorites.includes(player.id);

      return matchesSearch && matchesClub && matchesFav;
    });
  }, [players, search, selectedClub, showOnlyFavs, favorites]);

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      {toast && (
        <div className={`toast-banner ${toast.type}`}>{toast.message}</div>
      )}

      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <span className="logo-icon">🏆</span>
          <h1>{t.title}</h1>
        </div>

        <div className="nav-controls">
          <button
            className="add-player-cta"
            onClick={() => setIsAddModalOpen(true)}
          >
            + {t.addPlayerBtn}
          </button>

          <button className="reset-btn" onClick={handleReset} title={t.resetBtn}>
            ↻
          </button>

          <div className="lang-switcher">
            {["uz", "ru", "en"].map((code) => (
              <button
                key={code}
                className={lang === code ? "active" : ""}
                onClick={() => setLang(code)}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            className={`fav-filter-btn ${showOnlyFavs ? "active" : ""}`}
            onClick={() => setShowOnlyFavs(!showOnlyFavs)}
          >
            ♥ ({favorites.length})
          </button>

          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      {/* Hero & Search */}
      <section className="hero">
        <h2>{t.subtitle}</h2>
        <div className="filters-bar">
          <input
            type="text"
            className="search-input"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="club-select"
            value={selectedClub}
            onChange={(e) => setSelectedClub(e.target.value)}
          >
            {clubs.map((club) => (
              <option key={club} value={club}>
                {club === "ALL" ? t.allClubs : club}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Players Grid */}
      <main className="players-grid">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map((player) => {
            const isFav = favorites.includes(player.id);
            const stats = player.stats || { pac: 85, sho: 84, pas: 82, dri: 86 };
            const clubLogo = CLUB_LOGOS[player.company.name];
            return (
              <div className="player-card" key={player.id}>
                {/* Prime Card Banner */}
                <div
                  className="prime-banner"
                  style={{
                    background:
                      player.theme || "linear-gradient(135deg, #10b981, #0f172a)"
                  }}
                >
                  <div className="prime-top-row">
                    <div className="prime-ovr-box">
                      <span className="prime-ovr">{player.rating}</span>
                      <span className="prime-pos">{player.position}</span>
                      <span className="prime-flag">{player.flag || "⚽"}</span>
                    </div>

                    <span className="prime-era-pill">
                      {player.primeEra || "PRIME"}
                    </span>

                    <div className="card-top-actions">
                      <button
                        className={`fav-btn ${isFav ? "active" : ""}`}
                        onClick={() => toggleFavorite(player.id)}
                        title={t.favorite}
                      >
                        {isFav ? "♥" : "♡"}
                      </button>

                      <button
                        className="delete-icon-btn"
                        onClick={() =>
                          handleDeletePlayer(player.id, player.name)
                        }
                        title={t.delete}
                      >
                        🗑
                      </button>
                    </div>
                  </div>

                  <div className="prime-center">
                    {player.avatar ? (
                      <img
                        src={player.avatar}
                        alt={player.name}
                        className="prime-avatar-img"
                      />
                    ) : (
                      <div className="prime-initials">
                        {getInitials(player.name)}
                      </div>
                    )}

                    {clubLogo && (
                      <img
                        src={clubLogo}
                        alt={player.company.name}
                        className="prime-club-crest"
                      />
                    )}
                    <span className="prime-watermark">#{player.number}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="card-body">
                  <p className="player-username">@{player.username}</p>
                  <h3 className="player-name">{player.name}</h3>
                  <p className="player-club">⚽ {player.company.name}</p>
                  <p className="player-city">📍 {player.address.city}</p>
                  <p className="player-quote">“{player.company.catchPhrase}”</p>

                  {/* Mini FIFA Stats */}
                  <div className="mini-stats">
                    <div>
                      <span>PAC</span>
                      <strong>{stats.pac}</strong>
                    </div>
                    <div>
                      <span>SHO</span>
                      <strong>{stats.sho}</strong>
                    </div>
                    <div>
                      <span>PAS</span>
                      <strong>{stats.pas}</strong>
                    </div>
                    <div>
                      <span>DRI</span>
                      <strong>{stats.dri}</strong>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <button
                    className="details-btn"
                    onClick={() => setActivePlayer(player)}
                  >
                    {t.details}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="empty-state">{t.noResults}</p>
        )}
      </main>

      {/* Add Player Modal */}
      {isAddModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="modal-card form-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setIsAddModalOpen(false)}
            >
              ✕
            </button>

            <h2 className="form-title">⚽ {t.addNewPlayer}</h2>

            {formError && <div className="form-error">{formError}</div>}

            <form onSubmit={handleAddPlayer} className="player-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>{t.fullName} *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    placeholder="Ronaldinho Gaúcho"
                  />
                </div>

                <div className="form-group">
                  <label>{t.username}</label>
                  <input
                    name="username"
                    value={form.username}
                    onChange={handleFormChange}
                    placeholder="ronaldinho"
                  />
                </div>

                <div className="form-group">
                  <label>{t.club} *</label>
                  <input
                    name="club"
                    value={form.club}
                    onChange={handleFormChange}
                    placeholder="FC Barcelona"
                  />
                </div>

                <div className="form-group">
                  <label>{t.city}</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleFormChange}
                    placeholder="Barcelona"
                  />
                </div>

                <div className="form-group">
                  <label>{t.position}</label>
                  <select
                    name="position"
                    value={form.position}
                    onChange={handleFormChange}
                  >
                    <option value="ST">ST</option>
                    <option value="LW">LW</option>
                    <option value="RW">RW</option>
                    <option value="CAM">CAM</option>
                    <option value="CM">CM</option>
                    <option value="CB">CB</option>
                    <option value="GK">GK</option>
                  </select>
                </div>

                <div className="form-row-mini">
                  <div className="form-group">
                    <label>№</label>
                    <input
                      type="number"
                      name="number"
                      min="1"
                      max="99"
                      value={form.number}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>OVR</label>
                    <input
                      type="number"
                      name="rating"
                      min="50"
                      max="99"
                      value={form.rating}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>{t.email}</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleFormChange}
                    placeholder="player@club.com"
                  />
                </div>

                <div className="form-group">
                  <label>{t.phone}</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleFormChange}
                    placeholder="+998-90-123-45-67"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>{t.quoteLabel}</label>
                <input
                  name="catchPhrase"
                  value={form.catchPhrase}
                  onChange={handleFormChange}
                  placeholder="2005 Ballon d'Or Winner"
                />
              </div>

              <div className="form-group">
                <label>{t.avatarUrl}</label>
                <input
                  name="avatar"
                  value={form.avatar}
                  onChange={handleFormChange}
                  placeholder="https://..."
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  {t.cancel}
                </button>
                <button type="submit" className="submit-btn">
                  + {t.savePlayer}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Player Details Modal */}
      {activePlayer && (
        <div className="modal-overlay" onClick={() => setActivePlayer(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setActivePlayer(null)}
            >
              ✕
            </button>
            <div className="modal-header">
              <div
                className="modal-prime-badge"
                style={{ background: activePlayer.theme || "var(--accent)" }}
              >
                {activePlayer.avatar ? (
                  <img
                    src={activePlayer.avatar}
                    alt={activePlayer.name}
                    className="modal-avatar"
                  />
                ) : (
                  <span>{getInitials(activePlayer.name)}</span>
                )}
              </div>
              <div>
                <span className="modal-badge">
                  #{activePlayer.number} • {activePlayer.position} •{" "}
                  {activePlayer.rating} OVR {activePlayer.flag}
                </span>
                <h2>{activePlayer.name}</h2>
                <p className="modal-sub">
                  @{activePlayer.username} • {activePlayer.primeEra}
                </p>
              </div>
            </div>

            <div className="modal-info">
              <p>
                <strong>{t.club}:</strong> {activePlayer.company.name}
              </p>
              <p>
                <strong>{t.role}:</strong> {activePlayer.company.bs}
              </p>
              <p>
                <strong>{t.email}:</strong> {activePlayer.email}
              </p>
              <p>
                <strong>{t.phone}:</strong> {activePlayer.phone}
              </p>
              <p>
                <strong>{t.address}:</strong> {activePlayer.address.street},{" "}
                {activePlayer.address.city}
              </p>
              <p>
                <strong>{t.website}:</strong> {activePlayer.website}
              </p>
            </div>

            <div className="modal-footer-btns">
              <button
                className="modal-delete-btn"
                onClick={() =>
                  handleDeletePlayer(activePlayer.id, activePlayer.name)
                }
              >
                🗑 {t.delete}
              </button>
              <button
                className="modal-action-btn"
                onClick={() => setActivePlayer(null)}
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-brand">🏆 {t.title}</p>
          <p className="footer-count">
            {t.totalLabel}: <strong>{players.length}</strong>
          </p>
          <p className="footer-copy">
            © 2026 Pro Football Prime. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;