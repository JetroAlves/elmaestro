import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

type AdminTab = 'dashboard' | 'products' | 'recipes' | 'stores' | 'banners' | 'promotions' | 'stories' | 'categories';

interface AdminPageProps {
  onExit: () => void;
}

const BRANDS = ["Belprado", "Colonial", "El Maestro", "El Maestro Origens", "La Paulina", "Trentini"];
const COUNTRIES = ["Argentina", "Brasil", "Holanda", "Itália", "Uruguai"];
const PRODUCT_TYPES = [
  "Cabra", "Colonial", "Doce de Leite", "Gouda", "Grana Padano",
  "Maasdam", "Manteiga", "Minas", "Montanhês", "Mozarela",
  "Ovelha", "Parmesão", "Prato", "Proosdij", "Provolone",
  "Queijo Azul", "Serrano"
];

const BANNER_POSITIONS = [
  { id: 'hero', label: 'Hero Principal (Topo Home)' },
  { id: 'featured', label: 'Destaque Featured (Meio Home)' },
  { id: 'store', label: 'Chamada Onde Comprar' },
  { id: 'recipe', label: 'Cabeçalho de Receitas' }
];

const PAGES = ["Home - Principal", "Página de Produtos", "Página de Receitas", "Onde Comprar", "Sobre"];

// Ícones Minimalistas
const Icons = {
  Dashboard: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25a2.25 2.25 0 0 1-2.25 2.25h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" /></svg>,
  Products: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>,
  Recipes: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" /></svg>,
  Stores: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>,
  Banners: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l1.25 1.25V21h-16.5v-5.25Zm0 0V4.5A2.25 2.25 0 0 1 4.5 2.25h15a2.25 2.25 0 0 1 2.25 2.25V6.75" /></svg>,
  Categories: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 0 1 0 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.332.183-.582.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
}

const AdminPage: React.FC<AdminPageProps> = ({ onExit }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados para dados reais do Supabase
  const [products, setProducts] = useState<any[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [banners, setBanners] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [promotions, setPromotions] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      fetchAllData();
    }
  }, [isLoggedIn]);

  const fetchAllData = async () => {
    setLoading(true);
    const [p, r, b, s, pr, st] = await Promise.all([
      supabase.from('products').select('*').order('created_at', { ascending: false }),
      supabase.from('recipes').select('*').order('created_at', { ascending: false }),
      supabase.from('banners').select('*').order('created_at', { ascending: false }),
      supabase.from('stores').select('*').order('created_at', { ascending: false }),
      supabase.from('promotion_carousel').select('*').order('sorting_order', { ascending: true }),
      supabase.from('story_grid').select('*').order('sorting_order', { ascending: true })
    ]);

    if (p.data) setProducts(p.data);
    if (r.data) setRecipes(r.data);
    if (b.data) setBanners(b.data);
    if (s.data) setStores(s.data);
    if (pr.data) setPromotions(pr.data);
    if (st.data) setStories(st.data);
    setLoading(false);
  };

  // Estados do Formulário
  const [formData, setFormData] = useState<any>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [mobileImagePreview, setMobileImagePreview] = useState<string | null>(null);
  const [desktopFile, setDesktopFile] = useState<File | null>(null);
  const [mobileFile, setMobileFile] = useState<File | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const handleEdit = (item: any) => {
    setEditingItem(item);
    const initialFormData = { ...item };

    // Converter arrays de volta para texto para os textareas
    if (activeTab === 'recipes') {
      initialFormData.ingredientsText = item.ingredients?.join('\n') || '';
      initialFormData.instructionsText = item.instructions?.join('\n') || '';
    }

    setFormData(initialFormData);
    setImagePreview(item.image || item.image_desktop || null);
    setMobileImagePreview(item.image_mobile || null);
    setIsModalOpen(true);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === "admin") {
      setIsLoggedIn(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'desktop' | 'mobile' = 'desktop') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'mobile') {
        setMobileFile(file);
      } else {
        setDesktopFile(file);
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'mobile') {
          setMobileImagePreview(reader.result as string);
        } else {
          setImagePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File, path: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let tableName = '';
      let activeImageUrl = imagePreview;
      let mobileImageUrl = mobileImagePreview;

      // Upload images if they are new files
      if (desktopFile) {
        activeImageUrl = await uploadImage(desktopFile, activeTab);
      }
      if (mobileFile) {
        mobileImageUrl = await uploadImage(mobileFile, activeTab);
      }

      let processedData = {
        ...formData,
        image: activeImageUrl
      };

      if (activeTab === 'products') tableName = 'products';
      if (activeTab === 'recipes') {
        tableName = 'recipes';
        processedData.ingredients = formData.ingredientsText ? formData.ingredientsText.split('\n').filter((l: string) => l.trim() !== '') : [];
        processedData.instructions = formData.instructionsText ? formData.instructionsText.split('\n').filter((l: string) => l.trim() !== '') : [];
      }
      else if (activeTab === 'banners') {
        tableName = 'banners';
        // Banners não possuem coluna 'image', apenas desktop e mobile
        delete processedData.image;
        processedData.image_desktop = activeImageUrl;
        processedData.image_mobile = mobileImageUrl;

        // Lógica de Redirecionamento Padrão
        if (!processedData.link || processedData.link.trim() === '') {
          processedData.link = '/produtos';
        }
      }
      else if (activeTab === 'stores') tableName = 'stores';
      else if (activeTab === 'promotions') {
        tableName = 'promotion_carousel';
        // Para promoções, a imagem vem do produto se não houver upload fresco (que removemos do UI mas mantemos no logica por segurança)
        if (!activeImageUrl && formData.product_id) {
          const prod = products.find(p => p.id === formData.product_id);
          if (prod) activeImageUrl = prod.image;
        }
        processedData = {
          label: formData.label,
          title: formData.title,
          button_text: formData.button_text,
          pattern_color: formData.pattern_color,
          image: activeImageUrl,
          product_id: formData.product_id,
          sorting_order: promotions.length + 1
        };
      }
      else if (activeTab === 'stories') {
        tableName = 'story_grid';
        processedData.bg_color = formData.bgColor;
        processedData.is_special = formData.isSpecial === 'true';
      }

      if (tableName) {
        let result;
        if (editingItem) {
          result = await supabase.from(tableName).update(processedData).eq('id', editingItem.id);
        } else {
          result = await supabase.from(tableName).insert([processedData]);
        }

        if (!result.error) {
          fetchAllData();
          closeModal();
        } else {
          alert("Erro ao salvar no banco: " + result.error.message);
        }
      }
    } catch (err: any) {
      alert("Erro no upload ou salvamento: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!window.confirm("Deseja realmente excluir este item?")) return;

    let tableName = '';
    if (activeTab === 'products') tableName = 'products';
    if (activeTab === 'recipes') tableName = 'recipes';
    if (activeTab === 'banners') tableName = 'banners';
    if (activeTab === 'stores') tableName = 'stores';
    if (activeTab === 'promotions') tableName = 'promotion_carousel';
    if (activeTab === 'stories') tableName = 'story_grid';

    if (tableName) {
      const { error } = await supabase.from(tableName).delete().eq('id', id);
      if (!error) {
        fetchAllData();
      } else {
        alert("Erro ao excluir: " + error.message);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setImagePreview(null);
    setMobileImagePreview(null);
    setFormData({});
    setEditingItem(null);
    setDesktopFile(null);
    setMobileFile(null);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#FCFAE6] rounded-[3rem] p-10 md:p-12 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#90784E]"></div>
          <img src="https://kyflpnhnxnivnuysrszr.supabase.co/storage/v1/object/public/images/204a94a1-f534-43b9-b67e-9a3a2c9b2baf/LogoElMaestro.png" alt="Logo" className="h-12 mx-auto mb-10 brightness-0 opacity-80" />
          <h2 className="text-[#101010] text-3xl font-[900] uppercase tracking-tighter mb-2">Área Restrita</h2>
          <p className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-8">Acesso Administrativo</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Senha de acesso"
              className={`w-full bg-white border-2 rounded-full py-4 px-8 text-[#101010] font-bold outline-none transition-all text-center ${error ? 'border-red-500 animate-shake' : 'border-stone-200 focus:border-[#90784E]'}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="w-full bg-[#101010] text-white py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#90784E] transition-all">ENTRAR NO PAINEL</button>
          </form>
          <button onClick={onExit} className="mt-8 text-stone-400 text-[10px] font-black uppercase tracking-widest hover:text-[#101010]">Voltar ao Site</button>
        </div>
        <style>{`@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } } .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }`}</style>
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
    { id: 'products', label: 'Produtos', icon: Icons.Products },
    { id: 'recipes', label: 'Receitas', icon: Icons.Recipes },
    { id: 'stores', label: 'Onde Comprar', icon: Icons.Stores },
    { id: 'banners', label: 'Banners Gerais', icon: Icons.Banners },
    { id: 'promotions', label: 'Carrossel Promo', icon: Icons.Banners },
    { id: 'stories', label: 'StoryGrid', icon: Icons.Dashboard },
    { id: 'categories', label: 'Configurações', icon: Icons.Categories },
  ];

  const currentList =
    activeTab === 'products' ? products :
      activeTab === 'recipes' ? recipes :
        activeTab === 'banners' ? banners :
          activeTab === 'stores' ? stores :
            activeTab === 'promotions' ? promotions :
              stories;

  return (
    <div className="min-h-screen bg-[#FCFAE6] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-[#101010] flex flex-col h-screen sticky top-0 shrink-0">
        <div className="p-8 border-b border-stone-800 flex items-center justify-between">
          <img src="https://kyflpnhnxnivnuysrszr.supabase.co/storage/v1/object/public/images/204a94a1-f534-43b9-b67e-9a3a2c9b2baf/LogoElMaestro.png" alt="Logo" className="h-8 brightness-0 invert" />
          <span className="bg-[#90784E] text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest">ADM</span>
        </div>
        <nav className="flex-grow p-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as AdminTab)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-[#90784E] text-white shadow-lg' : 'text-stone-500 hover:text-stone-300 hover:bg-stone-900'}`}
            >
              <item.icon />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-stone-800">
          <button onClick={onExit} className="w-full bg-stone-900 text-stone-400 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-red-500 transition-all">Sair do Painel</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 md:p-12 overflow-y-auto h-screen no-scrollbar">
        <header className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[#90784E] font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">Administração Mg Queijos</span>
            <h1 className="text-[#101010] text-4xl md:text-5xl font-[900] uppercase tracking-tighter">
              {activeTab === 'dashboard' && "Visão Geral"}
              {activeTab === 'products' && "Gestão de Produtos"}
              {activeTab === 'recipes' && "Gestão de Receitas"}
              {activeTab === 'stores' && "Pontos de Venda"}
              {activeTab === 'banners' && "Banners Gerais"}
              {activeTab === 'promotions' && "Carrossel de Promoções"}
              {activeTab === 'stories' && "StoryGrid (Informativos)"}
              {activeTab === 'categories' && "Configurações"}
            </h1>
          </div>
          {activeTab !== 'dashboard' && activeTab !== 'categories' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#101010] text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#90784E] transition-all flex items-center gap-3 shadow-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
              Novo {activeTab === 'products' ? 'Produto' : activeTab === 'recipes' ? 'Receita' : activeTab === 'stores' ? 'Ponto' : 'Banner'}
            </button>
          )}
        </header>

        {activeTab === 'dashboard' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border-t-8 border-[#90784E]"><p className="text-stone-400 font-black text-[10px] uppercase tracking-widest mb-2">Produtos</p><p className="text-6xl font-[900] text-[#101010]">{products.length}</p></div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border-t-8 border-[#101010]"><p className="text-stone-400 font-black text-[10px] uppercase tracking-widest mb-2">Receitas</p><p className="text-6xl font-[900] text-[#101010]">{recipes.length}</p></div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border-t-8 border-stone-200"><p className="text-stone-400 font-black text-[10px] uppercase tracking-widest mb-2">Banners</p><p className="text-6xl font-[900] text-[#101010]">{banners.length + promotions.length + stories.length}</p></div>
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-stone-100">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-100">
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Preview</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Título / Nome</th>
                  {activeTab === 'products' && <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Origem / Marca</th>}
                  {activeTab === 'recipes' && <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Tempo / Dificuldade</th>}
                  {activeTab === 'stores' && <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Endereço / Cidade</th>}
                  {activeTab === 'banners' && <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Posição / Área</th>}
                  {activeTab === 'promotions' && <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Label / Título</th>}
                  {activeTab === 'stories' && <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Título / Especial</th>}
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-stone-400 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {currentList.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-10 py-20 text-center text-stone-400 font-black uppercase text-xs tracking-widest italic">Nenhum item cadastrado</td>
                  </tr>
                ) : currentList.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="px-10 py-6">
                      <div className="w-14 h-14 bg-[#FCFAE6] rounded-xl overflow-hidden border border-stone-200 p-2 flex items-center justify-center">
                        {item.image ? (
                          <img src={item.image} className="w-full h-full object-contain rounded-lg" />
                        ) : (
                          <div className="text-stone-300 text-xs">IMG</div>
                        )}
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <p className="text-[#101010] font-black text-sm uppercase tracking-tighter">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">ID: #{item.id}</p>
                    </td>
                    {activeTab === 'products' && <td className="px-10 py-6"><p className="text-[10px] font-black uppercase tracking-widest text-stone-500">{item.country} • {item.brand}</p></td>}
                    {activeTab === 'recipes' && <td className="px-10 py-6"><p className="text-[10px] font-black uppercase tracking-widest text-stone-500">{item.time} • {item.difficulty}</p></td>}
                    {activeTab === 'stores' && <td className="px-10 py-6"><p className="text-[10px] font-black uppercase tracking-widest text-stone-500">{item.address} • {item.city}</p></td>}
                    {activeTab === 'banners' && <td className="px-10 py-6"><p className="text-[10px] font-black uppercase tracking-widest text-stone-500">{(BANNER_POSITIONS.find(p => p.id === item.position)?.label) || 'Geral'}</p></td>}
                    {activeTab === 'promotions' && <td className="px-10 py-6"><p className="text-[10px] font-black uppercase tracking-widest text-stone-500">{item.label} • {item.title}</p></td>}
                    {activeTab === 'stories' && <td className="px-10 py-6"><p className="text-[10px] font-black uppercase tracking-widest text-stone-500">{item.title} • {item.is_special ? 'SIM' : 'NÃO'}</p></td>}
                    <td className="px-10 py-6 text-right space-x-4">
                      <button onClick={() => handleEdit(item)} className="text-[#90784E] text-[10px] font-black uppercase tracking-widest hover:underline">Editar</button>
                      <button onClick={() => deleteItem(item.id)} className="text-red-400 text-[10px] font-black uppercase tracking-widest hover:underline">Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* MODAL CONTEXTUAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#101010]/90 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative bg-[#FCFAE6] w-full max-w-3xl rounded-[3rem] p-10 md:p-14 shadow-2xl overflow-y-auto max-h-[90vh] no-scrollbar">
            <button onClick={closeModal} className="absolute top-8 right-8 text-[#101010]/20 hover:text-[#101010]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button>

            <h2 className="text-[#101010] text-3xl font-[900] uppercase tracking-tighter mb-10">
              {editingItem ? 'Editar' : 'Novo'} {
                activeTab === 'products' ? 'Produto' :
                  activeTab === 'recipes' ? 'Receita' :
                    activeTab === 'stores' ? 'Ponto de Venda' :
                      activeTab === 'banners' ? 'Banner' :
                        activeTab === 'promotions' ? 'Promoção' : 'Story'
              }
            </h2>

            <form className="space-y-8" onSubmit={handleSave}>

              {/* FORM PRODUTOS */}
              {activeTab === 'products' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Nome do Produto</label>
                    <input type="text" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Ex: Parmesão Black Matura 12" className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none transition-all" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Marca</label>
                    <select value={formData.brand || ''} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none" required>
                      <option value="">Selecione...</option>
                      {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">País</label>
                    <select value={formData.country || ''} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none" required>
                      <option value="">Selecione...</option>
                      {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Tipo</label>
                    <select value={formData.type || ''} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none" required>
                      <option value="">Selecione...</option>
                      {PRODUCT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Descrição do Produto</label>
                    <textarea value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} placeholder="Descreva os detalhes do queijo, sabor, maturação..." className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none transition-all"></textarea>
                  </div>
                </div>
              )}

              {/* FORM RECEITAS */}
              {activeTab === 'recipes' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Título da Receita</label>
                    <input type="text" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Ex: Risoto de Parmesão" className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none transition-all" required />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Ingrediente Principal (Queijo Sugerido)</label>
                    <select value={formData.mainProductId || ''} onChange={(e) => setFormData({ ...formData, mainProductId: e.target.value })} className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none" required>
                      <option value="">Selecione um produto cadastrado...</option>
                      {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Modo de Preparo (Passo a passo)</label>
                    <textarea value={formData.instructionsText || ''} onChange={(e) => setFormData({ ...formData, instructionsText: e.target.value })} rows={5} className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none"></textarea>
                  </div>
                </div>
              )}

              {/* FORM BANNERS (ATUALIZADO) */}
              {activeTab === 'banners' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Posição / Onde o banner aparecerá</label>
                    <select value={formData.position || ''} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none" required>
                      <option value="">Selecione a área do site...</option>
                      {BANNER_POSITIONS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Texto do Botão (CTA)</label>
                    <input type="text" value={formData.button_text || ''} onChange={(e) => setFormData({ ...formData, button_text: e.target.value })} placeholder="Ex: VER PRODUTOS" className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none transition-all" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Link de Destino</label>
                    <input type="text" value={formData.link || ''} onChange={(e) => setFormData({ ...formData, link: e.target.value })} placeholder="Ex: /produtos ou link completo" className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none transition-all" />
                  </div>
                </div>
              )}

              {/* FORM PROMOÇÕES */}
              {activeTab === 'promotions' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Label (Texto acima do título)</label>
                    <input type="text" value={formData.label || ''} onChange={(e) => setFormData({ ...formData, label: e.target.value })} placeholder="Ex: FEITO PARA UMA NOITE DE CINEMA" className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none transition-all" required />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Título da Promoção</label>
                    <input type="text" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Ex: APROVEITE AS FESTAS" className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none transition-all" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Texto do Botão</label>
                    <input type="text" value={formData.button_text || ''} onChange={(e) => setFormData({ ...formData, button_text: e.target.value })} placeholder="Ex: REÚNAM-SE" className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Vincular Produto (Sua foto será usada)</label>
                    <select
                      value={formData.product_id || ''}
                      onChange={(e) => {
                        const prod = products.find(p => p.id === e.target.value);
                        setFormData({ ...formData, product_id: e.target.value });
                        if (prod) setImagePreview(prod.image);
                      }}
                      className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none"
                    >
                      <option value="">Selecione um produto...</option>
                      {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Cor de Fundo (Classe CSS)</label>
                    <input type="text" value={formData.pattern_color || ''} onChange={(e) => setFormData({ ...formData, pattern_color: e.target.value })} placeholder="Ex: bg-[#101010]" className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none transition-all" />
                  </div>
                </div>
              )}

              {/* FORM STORIES */}
              {activeTab === 'stories' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Título</label>
                    <input type="text" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Ex: O RITMO DE UM BOM CUIDADO..." className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none transition-all" required />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Descrição / Texto</label>
                    <textarea value={formData.text || ''} onChange={(e) => setFormData({ ...formData, text: e.target.value })} rows={4} className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none"></textarea>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Destaque Dourado?</label>
                    <select value={formData.isSpecial?.toString() || 'false'} onChange={(e) => setFormData({ ...formData, isSpecial: e.target.value })} className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none">
                      <option value="false">Não</option>
                      <option value="true">Sim</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Cor de Fundo (Se especial)</label>
                    <input type="text" value={formData.bgColor || ''} onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })} placeholder="Ex: bg-[#E9A15E]" className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none transition-all" />
                  </div>
                </div>
              )}

              {/* FORM LOJAS */}
              {activeTab === 'stores' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Nome da Loja</label>
                    <input type="text" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Ex: Empório Santa Maria" className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none transition-all" required />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Endereço</label>
                    <input type="text" value={formData.address || ''} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="Rua, Número, Bairro" className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none" required />
                  </div>
                </div>
              )}

              {/* UPLOAD SECTION (CONTEXTUAL) */}
              <div className="space-y-6">
                <div className={`grid grid-cols-1 ${activeTab === 'banners' ? 'md:grid-cols-2' : ''} gap-8`}>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">
                      {activeTab === 'banners' ? 'Imagem (Desktop)' : activeTab === 'promotions' ? 'Foto do Produto (Automática)' : 'Imagem Principal'}
                    </label>
                    <div className="relative group">
                      {activeTab !== 'promotions' && <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'desktop')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />}
                      <div className={`w-full border-2 border-dashed rounded-[2rem] p-6 flex flex-col items-center justify-center transition-all min-h-[160px] ${imagePreview ? 'border-[#90784E] bg-white' : 'border-stone-200 bg-white/50'}`}>
                        {imagePreview ? (
                          <img src={imagePreview} className="w-full h-24 object-contain rounded-xl" />
                        ) : (
                          <p className="text-[10px] font-black uppercase tracking-widest text-[#101010]">Upload {activeTab === 'banners' ? 'Desktop' : 'Imagem'}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {activeTab === 'banners' && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Imagem (Mobile)</label>
                      <div className="relative group">
                        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'mobile')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className={`w-full border-2 border-dashed rounded-[2rem] p-6 flex flex-col items-center justify-center transition-all min-h-[160px] ${mobileImagePreview ? 'border-[#90784E] bg-white' : 'border-stone-200 bg-white/50'}`}>
                          {mobileImagePreview ? (
                            <img src={mobileImagePreview} className="w-16 h-24 object-contain rounded-xl" />
                          ) : (
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#101010]">Upload Mobile</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* BOTÕES */}
              <div className="flex flex-col md:flex-row gap-4 pt-6">
                <button type="submit" className="flex-grow bg-[#90784E] text-white py-5 rounded-full font-black text-xs uppercase tracking-widest hover:brightness-110 shadow-xl transition-all">SALVAR ALTERAÇÕES</button>
                <button type="button" onClick={closeModal} className="px-12 border-2 border-[#101010] text-[#101010] rounded-full font-black text-xs uppercase tracking-widest hover:bg-white transition-all">CANCELAR</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};

export default AdminPage;