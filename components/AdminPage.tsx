import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

type AdminTab = 'dashboard' | 'products' | 'recipes' | 'banners' | 'promotions' | 'stories' | 'categories' | 'showcase';

interface AdminPageProps {
  onExit: () => void;
}

// Hardcoded values replaced by dynamic data from Supabase

const BANNER_POSITIONS = [
  { id: 'hero', label: 'Hero Principal (Topo Home)' },
  { id: 'featured', label: 'Destaque Featured (Meio Home)' },
  { id: 'store', label: 'Chamada Onde Comprar' },
  { id: 'recipe', label: 'Cabeçalho de Receitas' }
];

const PAGES = ["Home - Principal", "Página de Produtos", "Página de Receitas", "Onde Comprar", "Sobre"];

// Ícones Minimalistas
const Icons = {
  Showcase: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>,
  Dashboard: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25a2.25 2.25 0 0 1-2.25 2.25h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" /></svg>,
  Products: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>,
  Recipes: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" /></svg>,
  Stores: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>,
  Banners: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l1.25 1.25V21h-16.5v-5.25Zm0 0V4.5A2.25 2.25 0 0 1 4.5 2.25h15a2.25 2.25 0 0 1 2.25 2.25V6.75" /></svg>,
  Categories: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 0 1 0 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.332.183-.582.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
}

const AdminPage: React.FC<AdminPageProps> = ({ onExit }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados para dados reais do Supabase
  const [products, setProducts] = useState<any[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [banners, setBanners] = useState<any[]>([]);

  const [promotions, setPromotions] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);
  const [showcase, setShowcase] = useState<any[]>([]);

  // Novos estados para metadados dinâmicos
  const [dbBrands, setDbBrands] = useState<any[]>([]);
  const [dbCountries, setDbCountries] = useState<any[]>([]);
  const [dbTypes, setDbTypes] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    const [p, r, b, pr, st, sh, brs, ctrs, tps] = await Promise.all([
      supabase.from('products').select('*').order('created_at', { ascending: false }),
      supabase.from('recipes').select('*, main_product:products(*)').order('created_at', { ascending: false }),
      supabase.from('banners').select('*').order('created_at', { ascending: false }),
      supabase.from('promotion_carousel').select('*').order('sorting_order', { ascending: true }),
      supabase.from('story_grid').select('*').order('sorting_order', { ascending: true }),
      supabase.from('home_showcase').select('*, products(*)').order('position', { ascending: true }),
      supabase.from('brands').select('*').order('name', { ascending: true }),
      supabase.from('countries').select('*').order('name', { ascending: true }),
      supabase.from('product_types').select('*').order('name', { ascending: true })
    ]);

    if (p.data) setProducts(p.data);
    if (r.data) setRecipes(r.data);
    if (b.data) setBanners(b.data);
    if (pr.data) setPromotions(pr.data);
    if (st.data) setStories(st.data);
    if (sh.data) setShowcase(sh.data);
    if (brs.data) setDbBrands(brs.data);
    if (ctrs.data) setDbCountries(ctrs.data);
    if (tps.data) setDbTypes(tps.data);
    setLoading(false);
  };

  // Estados do Formulário
  const [formData, setFormData] = useState<any>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [mobileImagePreview, setMobileImagePreview] = useState<string | null>(null);
  const [desktopFile, setDesktopFile] = useState<File | null>(null);
  const [mobileFile, setMobileFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [stickerFile, setStickerFile] = useState<File | null>(null);
  const [stickerPreview, setStickerPreview] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [showcaseSelections, setShowcaseSelections] = useState<string[]>(['', '', '']);
  const [locatorSelections, setLocatorSelections] = useState<string[]>(['', '', '', '', '', '']);

  // Estados para inserção rápida de metadados
  const [isMetadataModalOpen, setIsMetadataModalOpen] = useState(false);
  const [metadataType, setMetadataType] = useState<'brand' | 'type' | 'country'>('brand');
  const [newMetadataName, setNewMetadataName] = useState('');
  const [newCountryFlag, setNewCountryFlag] = useState<File | null>(null);
  const [flagPreview, setFlagPreview] = useState<string | null>(null);
  const [metadataLoading, setMetadataLoading] = useState(false);
  const [metadataSubTab, setMetadataSubTab] = useState<'brand' | 'country' | 'type'>('brand');
  const [editingMetadataItem, setEditingMetadataItem] = useState<any | null>(null);

  useEffect(() => {
    if (activeTab === 'showcase' && showcase.length > 0) {
      const showS = ['', '', ''];
      const locS = ['', '', '', '', '', ''];

      showcase.forEach(s => {
        if (s.section_type === 'locator') {
          if (s.position >= 1 && s.position <= 6) locS[s.position - 1] = s.product_id;
        } else {
          // Default ou 'showcase'
          if (s.position >= 1 && s.position <= 3) showS[s.position - 1] = s.product_id;
        }
      });

      setShowcaseSelections(showS);
      setLocatorSelections(locS);
    }
  }, [showcase, activeTab]);

  const handleSaveShowcase = async (type: 'showcase' | 'locator') => {
    setLoading(true);
    try {
      // Remover apenas os destaques do tipo selecionado
      await supabase.from('home_showcase').delete().eq('section_type', type);

      const selections = type === 'showcase' ? showcaseSelections : locatorSelections;

      const toInsert = selections
        .map((prodId, idx) => ({
          product_id: prodId,
          position: idx + 1,
          section_type: type
        }))
        .filter(s => s.product_id !== '');

      if (toInsert.length > 0) {
        const { error } = await supabase.from('home_showcase').insert(toInsert);
        if (error) throw error;
      }

      alert(`Destaques (${type === 'showcase' ? 'Vitrine' : 'Lojas'}) atualizados!`);
      fetchAllData();
    } catch (err: any) {
      alert("Erro ao salvar destaques: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMetadata = async () => {
    if (!newMetadataName.trim()) {
      alert("Por favor, digite um nome.");
      return;
    }

    setMetadataLoading(true);
    try {
      let finalFlagUrl = '';
      if (metadataType === 'country' && newCountryFlag) {
        finalFlagUrl = await uploadImage(newCountryFlag, 'countries');
      }

      let tableName = '';
      let data: any = { name: newMetadataName };

      if (metadataType === 'brand') tableName = 'brands';
      if (metadataType === 'type') tableName = 'product_types';
      if (metadataType === 'country') {
        tableName = 'countries';
        if (finalFlagUrl) {
          data.flag_url = finalFlagUrl;
        } else if (editingMetadataItem) {
          // Mantém a bandeira anterior se não enviou uma nova
          data.flag_url = editingMetadataItem.flag_url;
        }
      }

      const { error } = editingMetadataItem
        ? await supabase.from(tableName).update(data).eq('id', editingMetadataItem.id)
        : await supabase.from(tableName).insert(data);

      if (error) throw error;

      alert(`${metadataType === 'brand' ? 'Marca' : metadataType === 'type' ? 'Tipo' : 'País'} ${editingMetadataItem ? 'atualizado' : 'adicionado'} com sucesso!`);

      // Resetar estados
      setNewMetadataName('');
      setNewCountryFlag(null);
      setFlagPreview(null);
      setIsMetadataModalOpen(false);
      setEditingMetadataItem(null);

      // Atualizar listas
      fetchAllData();
    } catch (err: any) {
      alert("Erro ao salvar: " + err.message);
    } finally {
      setMetadataLoading(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    const initialFormData = { ...item };

    // Converter nomes de colunas do banco (snake_case) para o estado do form (camelCase)
    if (activeTab === 'recipes') {
      initialFormData.ingredients = item.ingredients || [''];
      initialFormData.instructions = item.instructions || [''];
      initialFormData.main_product_id = item.main_product_id || '';
    }

    setFormData(initialFormData);
    setImagePreview(item.image || item.image_desktop || null);
    setMobileImagePreview(item.image_mobile || null);
    setVideoPreview(item.video_url || null);
    setStickerPreview(item.sticker_url || null);
    setIsModalOpen(true);
  };

  const handleLogout = async () => {
    if (confirm("Deseja realmente sair?")) {
      await supabase.auth.signOut();
      onExit();
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

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const handleStickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setStickerFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setStickerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditMetadata = (item: any) => {
    setMetadataType(metadataSubTab);
    setNewMetadataName(item.name);
    setEditingMetadataItem(item);
    if (metadataSubTab === 'country' && item.flag_url) {
      setFlagPreview(item.flag_url);
    } else {
      setFlagPreview(null);
    }
    setIsMetadataModalOpen(true);
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, field: string) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = formData[field] || '';

      const before = text.substring(0, start);
      const selectedText = text.substring(start, end);
      const after = text.substring(end);

      const newText = `${before}**${selectedText}**${after}`;
      setFormData({ ...formData, [field]: newText });

      // Tenta restaurar a seleção após o render (aproximado)
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + 2, end + 2);
      }, 0);
    }
  };

  const handleFlagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewCountryFlag(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFlagPreview(reader.result as string);
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

  // Funções Auxiliares para Listas (Receitas)
  const addIngredient = () => {
    const newIngredients = [...(formData.ingredients || []), ''];
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const removeIngredient = (index: number) => {
    const newIngredients = formData.ingredients.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addStep = () => {
    const newSteps = [...(formData.instructions || []), ''];
    setFormData({ ...formData, instructions: newSteps });
  };

  const removeStep = (index: number) => {
    const newSteps = formData.instructions.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, instructions: newSteps });
  };

  const updateStep = (index: number, value: string) => {
    const newSteps = [...formData.instructions];
    newSteps[index] = value;
    setFormData({ ...formData, instructions: newSteps });
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

      let finalVideoUrl = videoPreview;
      if (videoFile) {
        finalVideoUrl = await uploadImage(videoFile, activeTab);
      }
      let finalStickerUrl = stickerPreview;
      if (stickerFile) {
        finalStickerUrl = await uploadImage(stickerFile, activeTab);
      }

      let processedData = {
        ...formData,
        image: activeImageUrl
      };

      if (activeTab === 'products') tableName = 'products';
      if (activeTab === 'recipes') {
        tableName = 'recipes';
        processedData.ingredients = formData.ingredients ? formData.ingredients.filter((l: string) => l.trim() !== '') : [];
        processedData.instructions = formData.instructions ? formData.instructions.filter((l: string) => l.trim() !== '') : [];

        // Mapear para o nome exato da coluna no banco
        processedData.main_product_id = formData.main_product_id || null;

        // Remover campos que não existem na tabela recipes (evitar erro PostgREST)
        // delete processedData.ocasion; // Re-ativado para salvar no banco
        delete processedData.ocasião;
        delete processedData.category;
        delete processedData.mainProductId; // Case antigo do frontend
        delete processedData.main_product;  // Objeto do join no Admin
        delete processedData.mainCheese;    // Objeto do join no display
      }
      else if (activeTab === 'banners') {
        tableName = 'banners';
        // Banners não possuem coluna 'image', apenas desktop e mobile
        delete processedData.image;
        processedData.image_desktop = activeImageUrl;
        processedData.image_mobile = mobileImageUrl;
        processedData.video_url = finalVideoUrl;
        processedData.sticker_url = finalStickerUrl;

        // Lógica de Redirecionamento Padrão
        if (!processedData.link || processedData.link.trim() === '') {
          processedData.link = '/produtos';
        }
      }

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
        // summary e content já estão no processedData via spread do formData se os IDs baterem
        // Mas garantimos mapeamento se necessário
        processedData.text = formData.text; // Resumo curto para o card
        processedData.summary = formData.summary; // Resumo opcional
        processedData.content = formData.content; // Conteúdo completo (Blog)
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

    if (activeTab === 'promotions') tableName = 'promotion_carousel';
    if (activeTab === 'stories') tableName = 'story_grid';

    // Suporte para exclusão de metadados
    if (tableName === '' && activeTab === 'categories') {
      if (metadataSubTab === 'brand') tableName = 'brands';
      if (metadataSubTab === 'country') tableName = 'countries';
      if (metadataSubTab === 'type') tableName = 'product_types';
    }

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
    setVideoFile(null);
    setVideoPreview(null);
    setStickerFile(null);
    setStickerPreview(null);
  };


  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
    { id: 'products', label: 'Produtos', icon: Icons.Products },
    { id: 'recipes', label: 'Receitas', icon: Icons.Recipes },

    { id: 'banners', label: 'Banners Gerais', icon: Icons.Banners },
    { id: 'promotions', label: 'Carrossel Promo', icon: Icons.Banners },
    { id: 'stories', label: 'StoryGrid', icon: Icons.Dashboard },
    { id: 'showcase', label: 'Destaques Home', icon: Icons.Showcase },
    { id: 'categories', label: 'Categorias', icon: Icons.Categories },
  ];

  const rawList =
    activeTab === 'products' ? products :
      activeTab === 'recipes' ? recipes :
        activeTab === 'banners' ? banners :
          activeTab === 'promotions' ? promotions :
            stories;

  const currentList = searchTerm.trim() === '' ? rawList : rawList.filter((item: any) => {
    const term = searchTerm.toLowerCase();
    const name = (item.name || '').toLowerCase();
    const title = (item.title || '').toLowerCase();
    if (activeTab === 'products') {
      const brand = (item.brand || '').toLowerCase();
      const country = (item.country || '').toLowerCase();
      return name.includes(term) || brand.includes(term) || country.includes(term);
    }
    if (activeTab === 'recipes') {
      const ocasion = (item.ocasion || '').toLowerCase();
      return name.includes(term) || ocasion.includes(term);
    }
    if (activeTab === 'stories') {
      return name.includes(term) || title.includes(term);
    }
    return name.includes(term) || title.includes(term);
  });

  return (
    <div className="min-h-screen bg-[#FCFAE6] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-[#101010] flex flex-col h-screen sticky top-0 shrink-0">
        <div className="p-8 border-b border-stone-800 flex items-center justify-between">
          <img src="https://mqcjdxflipzlwhfrfyky.supabase.co/storage/v1/object/public/images/logomarca/LogoElMaestro.png" alt="Logo" className="h-8 shadow-sm" />
          <span className="bg-[#90784E] text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest">ADM</span>
        </div>
        <nav className="flex-grow p-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id as AdminTab); setSearchTerm(''); }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-[#90784E] text-white shadow-lg' : 'text-stone-500 hover:text-stone-300 hover:bg-stone-900'}`}
            >
              <item.icon />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-stone-800">
          <button onClick={handleLogout} className="w-full bg-stone-900 text-stone-400 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-red-500 transition-all flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>
            Sair do Painel
          </button>
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

              {activeTab === 'banners' && "Banners Gerais"}
              {activeTab === 'promotions' && "Carrossel de Promoções"}
              {activeTab === 'stories' && "StoryGrid (Informativos)"}
              {activeTab === 'showcase' && "Destaques da Home"}
            </h1>
          </div>
          {activeTab !== 'dashboard' && activeTab !== 'showcase' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#101010] text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#90784E] transition-all flex items-center gap-3 shadow-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
              Novo {activeTab === 'products' ? 'Produto' : activeTab === 'recipes' ? 'Receita' : 'Banner'}
            </button>
          )}
        </header>

        {activeTab === 'dashboard' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border-t-8 border-[#90784E]"><p className="text-stone-400 font-black text-[10px] uppercase tracking-widest mb-2">Produtos</p><p className="text-6xl font-[900] text-[#101010]">{products.length}</p></div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border-t-8 border-[#101010]"><p className="text-stone-400 font-black text-[10px] uppercase tracking-widest mb-2">Receitas</p><p className="text-6xl font-[900] text-[#101010]">{recipes.length}</p></div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border-t-8 border-stone-200"><p className="text-stone-400 font-black text-[10px] uppercase tracking-widest mb-2">Banners</p><p className="text-6xl font-[900] text-[#101010]">{banners.length + promotions.length + stories.length}</p></div>
          </div>
        ) : activeTab === 'showcase' ? (
          <div className="space-y-12 max-w-5xl">
            {/* VITRINE PRINCIPAL */}
            <div className="bg-white rounded-[3rem] shadow-xl p-12 border border-stone-100">
              <div className="mb-10">
                <h3 className="text-2xl font-black text-[#101010] uppercase tracking-tighter mb-2">Vitrine Principal (3 itens)</h3>
                <p className="text-stone-500 font-bold text-sm">Seção "NOSSOS PRODUTOS" da página principal.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                {[0, 1, 2].map((i) => {
                  const selectedProd = products.find(p => p.id === showcaseSelections[i]);
                  return (
                    <div key={i} className="space-y-4">
                      <div className="bg-[#FCFAE6] aspect-square rounded-[2rem] border-2 border-dashed border-stone-200 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                        {selectedProd ? (
                          <>
                            <img src={selectedProd.image} className="h-4/5 object-contain mb-2 drop-shadow-xl" />
                            <p className="text-[10px] font-black uppercase text-[#101010] truncate w-full px-2">{selectedProd.name}</p>
                          </>
                        ) : (
                          <div className="text-stone-300">
                            <Icons.Products />
                            <p className="text-[10px] font-black uppercase mt-2 tracking-widest text-[#101010]/20">Slot {i + 1} Vazio</p>
                          </div>
                        )}
                      </div>
                      <select
                        value={showcaseSelections[i]}
                        onChange={(e) => {
                          const newS = [...showcaseSelections];
                          newS[i] = e.target.value;
                          setShowcaseSelections(newS);
                        }}
                        className="w-full bg-white border-2 border-stone-100 rounded-xl py-3 px-4 text-[#101010] font-bold focus:border-[#90784E] outline-none text-xs"
                      >
                        <option value="">Selecionar Produto...</option>
                        {products.map(p => (
                          <option key={p.id} value={p.id}>{p.name} ({p.brand})</option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => handleSaveShowcase('showcase')}
                disabled={loading}
                className="bg-[#101010] text-white px-12 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#90784E] transition-all shadow-xl disabled:opacity-50"
              >
                {loading ? 'SALVANDO...' : 'SALVAR VITRINE'}
              </button>
            </div>

            {/* SEÇÃO ONDE ENCONTRAR */}
            <div className="bg-white rounded-[3rem] shadow-xl p-12 border border-stone-100">
              <div className="mb-10">
                <h3 className="text-2xl font-black text-[#101010] uppercase tracking-tighter mb-2">Carrossel "Onde Encontrar" (até 6 itens)</h3>
                <p className="text-stone-500 font-bold text-sm">Seção com o carrossel infinito próximo ao rodapé da Home.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-10">
                {[0, 1, 2, 3, 4, 5].map((i) => {
                  const selectedProd = products.find(p => p.id === locatorSelections[i]);
                  return (
                    <div key={i} className="space-y-4">
                      <div className="bg-[#FCFAE6] aspect-square rounded-[1.5rem] border-2 border-dashed border-stone-200 flex flex-col items-center justify-center p-4 text-center overflow-hidden">
                        {selectedProd ? (
                          <img src={selectedProd.image} className="h-full object-contain drop-shadow-lg" />
                        ) : (
                          <div className="text-stone-300">
                            <Icons.Products />
                          </div>
                        )}
                      </div>
                      <select
                        value={locatorSelections[i]}
                        onChange={(e) => {
                          const newS = [...locatorSelections];
                          newS[i] = e.target.value;
                          setLocatorSelections(newS);
                        }}
                        className="w-full bg-white border border-stone-100 rounded-lg py-2 px-2 text-[#101010] font-bold focus:border-[#90784E] outline-none text-[8px] uppercase tracking-tighter"
                      >
                        <option value="">Slot {i + 1}</option>
                        {products.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => handleSaveShowcase('locator')}
                disabled={loading}
                className="bg-[#101010] text-white px-12 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#90784E] transition-all shadow-xl disabled:opacity-50"
              >
                {loading ? 'SALVANDO...' : 'SALVAR CARROSSEL'}
              </button>
            </div>
          </div>
        ) : activeTab === 'categories' ? (
          <div className="space-y-8 max-w-5xl">
            <div className="flex gap-4">
              {(['brand', 'country', 'type'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setMetadataSubTab(tab)}
                  className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${metadataSubTab === tab ? 'bg-[#101010] text-white shadow-lg' : 'bg-white text-stone-400 hover:text-[#101010]'}`}
                >
                  {tab === 'brand' ? 'Marcas' : tab === 'country' ? 'Países' : 'Tipos'}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-stone-100">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-100">
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-stone-400">
                      {metadataSubTab === 'country' ? 'Bandeira' : 'ID'}
                    </th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Nome</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-stone-400 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {(metadataSubTab === 'brand' ? dbBrands : metadataSubTab === 'country' ? dbCountries : dbTypes).length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-10 py-20 text-center text-stone-400 font-black uppercase text-xs tracking-widest italic">Nenhum item cadastrado</td>
                    </tr>
                  ) : (metadataSubTab === 'brand' ? dbBrands : metadataSubTab === 'country' ? dbCountries : dbTypes).map((item) => (
                    <tr key={item.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="px-10 py-6">
                        {metadataSubTab === 'country' && item.flag_url ? (
                          <div className="w-10 h-6 bg-[#FCFAE6] rounded overflow-hidden border border-stone-200">
                            <img src={item.flag_url} className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <span className="text-[8px] text-stone-300 font-mono">#{item.id.slice(0, 8)}</span>
                        )}
                      </td>
                      <td className="px-10 py-6">
                        <p className="text-[#101010] font-black text-sm uppercase tracking-tighter">{item.name}</p>
                      </td>
                      <td className="px-10 py-6 text-right space-x-4">
                        <button onClick={() => handleEditMetadata(item)} className="text-[#90784E] text-[10px] font-black uppercase tracking-widest hover:underline">Editar</button>
                        <button onClick={() => deleteItem(item.id)} className="text-red-400 text-[10px] font-black uppercase tracking-widest hover:underline">Excluir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => { setMetadataType(metadataSubTab); setIsMetadataModalOpen(true); }}
              className="bg-[#90784E] text-white px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:brightness-110 transition-all shadow-xl"
            >
              Adicionar {metadataSubTab === 'brand' ? 'Marca' : metadataSubTab === 'country' ? 'País' : 'Tipo'}
            </button>
          </div>
        ) : (
          <div>
            {/* Barra de Busca para Produtos, Receitas e Stories */}
            {(activeTab === 'products' || activeTab === 'recipes' || activeTab === 'stories') && (
              <div className="mb-6 relative">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-stone-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={`Buscar ${activeTab === 'products' ? 'produtos por nome, marca ou país...' : activeTab === 'recipes' ? 'receitas por nome ou ocasião...' : 'stories por nome ou título...'}`}
                  className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 pl-14 pr-6 text-[#101010] font-bold text-sm focus:border-[#90784E] outline-none transition-all shadow-sm placeholder:text-stone-300 placeholder:font-medium"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-6 flex items-center text-stone-300 hover:text-stone-600 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            )}
            <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-stone-100">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-100">
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Preview</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Título / Nome</th>
                    {activeTab === 'products' && <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Origem / Marca</th>}
                    {activeTab === 'recipes' && <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Ocasião / Tempo</th>}

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
                      {activeTab === 'recipes' && <td className="px-10 py-6"><p className="text-[10px] font-black uppercase tracking-widest text-stone-500">{item.ocasion} • {item.time}</p></td>}

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
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Marca</label>
                      <button type="button" onClick={() => { setMetadataType('brand'); setIsMetadataModalOpen(true); }} className="text-[#90784E] text-[10px] font-black uppercase hover:underline">+ Novo</button>
                    </div>
                    <select value={formData.brand || ''} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none" required>
                      <option value="">Selecione...</option>
                      {dbBrands.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">País</label>
                      <button type="button" onClick={() => { setMetadataType('country'); setIsMetadataModalOpen(true); }} className="text-[#90784E] text-[10px] font-black uppercase hover:underline">+ Novo</button>
                    </div>
                    <select value={formData.country || ''} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none" required>
                      <option value="">Selecione...</option>
                      {dbCountries.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Tipo</label>
                      <button type="button" onClick={() => { setMetadataType('type'); setIsMetadataModalOpen(true); }} className="text-[#90784E] text-[10px] font-black uppercase hover:underline">+ Novo</button>
                    </div>
                    <select value={formData.type || ''} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none" required>
                      <option value="">Selecione...</option>
                      {dbTypes.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
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
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Título da Receita</label>
                      <input type="text" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Ex: Risoto de Parmesão" className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none transition-all" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Ocasião (Categoria)</label>
                      <select value={formData.ocasion || ''} onChange={(e) => setFormData({ ...formData, ocasion: e.target.value })} className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none" required>
                        <option value="">Selecione...</option>
                        {["Almoço", "Jantar", "Petiscos", "Sobremesas", "Café da Manhã"].map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Ingrediente Principal (El Maestro)</label>
                      <select value={formData.main_product_id || ''} onChange={(e) => setFormData({ ...formData, main_product_id: e.target.value })} className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none" required>
                        <option value="">Selecione um produto...</option>
                        {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Tempo de Preparo</label>
                      <input type="text" value={formData.time || ''} onChange={(e) => setFormData({ ...formData, time: e.target.value })} placeholder="Ex: 30 min" className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Dificuldade</label>
                      <select value={formData.difficulty || ''} onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })} className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none" required>
                        <option value="">Selecione...</option>
                        {["Muito Fácil", "Fácil", "Médio", "Gourmet"].map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* INGREDIENTES DINÂMICOS */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Lista de Ingredientes (Um por um)</label>
                      <button type="button" onClick={addIngredient} className="text-[#90784E] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:underline">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                        Adicionar
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {(formData.ingredients || ['']).map((ing: string, index: number) => (
                        <div key={index} className="flex gap-3">
                          <input
                            type="text"
                            value={ing}
                            onChange={(e) => updateIngredient(index, e.target.value)}
                            placeholder={`Ingrediente ${index + 1}`}
                            className="flex-grow bg-white border-2 border-stone-100 rounded-xl py-3 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none transition-all"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => removeIngredient(index)}
                            className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition-all"
                            disabled={formData.ingredients?.length <= 1}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PASSOS DINÂMICOS */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Modo de Preparo (Passo a passo)</label>
                      <button type="button" onClick={addStep} className="text-[#90784E] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:underline">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                        Novo Passo
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {(formData.instructions || ['']).map((step: string, index: number) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col gap-2 flex-grow">
                            <div className="text-[10px] font-black text-[#90784E]">PASSO {(index + 1).toString().padStart(2, '0')}</div>
                            <textarea
                              value={step}
                              onChange={(e) => updateStep(index, e.target.value)}
                              placeholder="Descreva o que fazer neste passo..."
                              rows={2}
                              className="w-full bg-white border-2 border-stone-100 rounded-xl py-3 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none transition-all"
                              required
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeStep(index)}
                            className="p-3 self-end text-red-400 hover:bg-red-50 rounded-xl transition-all"
                            disabled={formData.instructions?.length <= 1}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                          </button>
                        </div>
                      ))}
                    </div>
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
                  {activeTab !== 'banners' && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Texto do Botão (CTA)</label>
                      <input type="text" value={formData.button_text || ''} onChange={(e) => setFormData({ ...formData, button_text: e.target.value })} placeholder="Ex: VER PRODUTOS" className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none transition-all" />
                    </div>
                  )}
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
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Título da História</label>
                    <input type="text" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Ex: O RITMO DE UM BOM CUIDADO..." className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none transition-all" required />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Resumo do Card (Texto Curto)</label>
                    <textarea value={formData.text || ''} onChange={(e) => setFormData({ ...formData, text: e.target.value })} rows={2} placeholder="Uma frase curta que aparece no card..." className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none transition-all" required></textarea>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Conteúdo Completo (Estilo Blog)</label>
                      <span className="text-[8px] font-bold text-[#90784E] uppercase tracking-widest">Dica: Selecione o texto e use **Ctrl + B** para negrito</span>
                    </div>
                    <textarea
                      value={formData.content || ''}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      onKeyDown={(e) => handleTextareaKeyDown(e, 'content')}
                      rows={8}
                      placeholder="Escreva a história completa aqui..."
                      className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none transition-all"
                    ></textarea>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Destaque Especial?</label>
                    <select value={formData.is_special?.toString() || 'false'} onChange={(e) => setFormData({ ...formData, is_special: e.target.value === 'true' })} className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none">
                      <option value="false">Não</option>
                      <option value="true">Sim (Prêmio/Bônus)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Cor de Fundo (Ex: bg-amber-50)</label>
                    <input type="text" value={formData.bg_color || ''} onChange={(e) => setFormData({ ...formData, bg_color: e.target.value })} placeholder="Ex: bg-white" className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none transition-all" />
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
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Etiqueta/Selo (Canto Superior Direito)</label>
                      <div className="relative group">
                        <input type="file" accept="image/*" onChange={handleStickerChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className={`w-full border-2 border-dashed rounded-[2rem] p-6 flex flex-col items-center justify-center transition-all min-h-[160px] ${stickerPreview ? 'border-[#90784E] bg-white' : 'border-stone-200 bg-white/50'}`}>
                          {stickerPreview ? (
                            <div className="relative w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center overflow-hidden border border-[#90784E]/20">
                              <img src={stickerPreview} className="w-full h-full object-contain p-2" />
                            </div>
                          ) : (
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#101010]">Upload Etiqueta</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'banners' && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Vídeo de Fundo (Opcional)</label>
                      <div className="relative group">
                        <input type="file" accept="video/*" onChange={handleVideoChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className={`w-full border-2 border-dashed rounded-[2rem] p-6 flex flex-col items-center justify-center transition-all min-h-[160px] ${videoPreview ? 'border-[#90784E] bg-white' : 'border-stone-200 bg-white/50'}`}>
                          {videoPreview ? (
                            <video src={videoPreview} className="h-24 w-auto rounded-xl" muted />
                          ) : (
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#101010]">Upload Vídeo (MP4, etc)</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

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

      {/* MODAL METADADOS (Marcas, Tipos, Países) */}
      {isMetadataModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#101010]/95 backdrop-blur-xl" onClick={() => {
            setIsMetadataModalOpen(false);
            setEditingMetadataItem(null);
            setNewMetadataName('');
            setNewCountryFlag(null);
            setFlagPreview(null);
          }} />
          <div className="relative w-full max-w-lg bg-[#FCFAE6] rounded-[3rem] shadow-2xl p-10 md:p-14 overflow-hidden border border-white/20">
            <h2 className="text-3xl font-black text-[#101010] uppercase tracking-tighter mb-10 flex items-center gap-4">
              <span className="bg-[#90784E] text-white p-3 rounded-2xl">
                {editingMetadataItem ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                )}
              </span>
              {editingMetadataItem ? 'Editar' : 'Cadastrar'} {metadataType === 'brand' ? 'Marca' : metadataType === 'type' ? 'Tipo' : 'País'}
            </h2>

            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60">Nome</label>
                <input
                  type="text"
                  value={newMetadataName}
                  onChange={(e) => setNewMetadataName(e.target.value)}
                  placeholder={editingMetadataItem ? "Novo nome..." : `Digite o nome da ${metadataType === 'brand' ? 'marca' : metadataType === 'type' ? 'tipo' : 'país'}...`}
                  className="w-full bg-white border-2 border-stone-100 rounded-2xl py-4 px-6 text-[#101010] font-bold focus:border-[#90784E] outline-none transition-all"
                />
              </div>

              {metadataType === 'country' && (
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#101010]/60 text-center block">Bandeira do País</label>
                  <div className="relative group">
                    <input type="file" accept="image/*" onChange={handleFlagChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className={`w-full border-2 border-dashed rounded-[2rem] p-8 flex flex-col items-center justify-center transition-all ${flagPreview ? 'border-[#90784E] bg-white' : 'border-stone-200 bg-white/50 hover:border-[#90784E]'}`}>
                      {flagPreview ? (
                        <div className="relative">
                          <img src={flagPreview} className="h-20 w-auto object-contain rounded shadow-lg" alt="Preview Bandeira" />
                          <div className="absolute -top-2 -right-2 bg-[#90784E] text-white p-1 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
                          </div>
                        </div>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-stone-300 mb-4 group-hover:scale-110 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                          <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Upload Bandeira</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-4 pt-6">
                <button
                  type="button"
                  onClick={handleSaveMetadata}
                  disabled={metadataLoading}
                  className="w-full bg-[#101010] text-white py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#90784E] shadow-xl transition-all disabled:opacity-50"
                >
                  {metadataLoading ? 'SALVANDO...' : `${editingMetadataItem ? 'ATUALIZAR' : 'CADASTRAR'} ${metadataType === 'brand' ? 'MARCA' : metadataType === 'type' ? 'TIPO' : 'PAÍS'}`}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMetadataModalOpen(false);
                    setEditingMetadataItem(null);
                    setNewMetadataName('');
                    setNewCountryFlag(null);
                    setFlagPreview(null);
                  }}
                  className="text-stone-400 font-black text-[10px] uppercase tracking-widest hover:text-[#101010] transition-colors"
                >
                  CANCELAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};

export default AdminPage;