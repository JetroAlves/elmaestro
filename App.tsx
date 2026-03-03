import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import PromotionCarousel from './components/PromotionCarousel';
import StoryGrid from './components/StoryGrid';
import FeaturedImageSection from './components/FeaturedImageSection';
import ProductShowcaseSection from './components/ProductShowcaseSection';
import StoreLocatorSection from './components/StoreLocatorSection';
import RecipeSection from './components/RecipeSection';
import ProductsPage from './components/ProductsPage';
import ProductDetailsPage from './components/ProductDetailsPage';
import RecipesPage from './components/RecipesPage';
import RecipeDetailsPage from './components/RecipeDetailsPage';
import StoryDetailsPage from './components/StoryDetailsPage';
import BlogPage from './components/BlogPage';
import AboutPage from './components/AboutPage';
import StoreLocatorPage from './components/StoreLocatorPage';
import AdminPage from './components/AdminPage';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';
import AdminLoginPage from './components/AdminLoginPage';

import { supabase } from './services/supabase';
import { Session } from '@supabase/supabase-js';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'products' | 'product-details' | 'recipes' | 'recipe-details' | 'story-details' | 'blog' | 'about' | 'stores' | 'admin' | 'privacy' | 'terms'>('home');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Pegar sessão inicial
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
    });

    // Ouvir mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleOpenProduct = (product: any) => {
    setSelectedProduct(product);
    setCurrentView('product-details');
    window.scrollTo(0, 0);
  };

  const handleOpenRecipe = (recipe: any) => {
    setSelectedRecipe(recipe);
    setCurrentView('recipe-details');
    window.scrollTo(0, 0);
  };

  const handleOpenStory = (story: any) => {
    setSelectedStory(story);
    setCurrentView('story-details');
    window.scrollTo(0, 0);
  };

  const handleBackToProducts = () => {
    setCurrentView('products');
    window.scrollTo(0, 0);
  };

  const handleBackToRecipes = () => {
    setCurrentView('recipes');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      <Header onNavigate={(view) => setCurrentView(view)} />

      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <Hero
              onNavigateToProducts={() => setCurrentView('products')}
              onNavigateToStores={() => setCurrentView('stores')}
            />
            <section className="py-12 md:py-32 px-4 bg-[#FCFAE6]">
              <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#101010] leading-tight tracking-tight text-balance">
                  Eternizando momentos
                </h2>
              </div>
            </section>
            <section className="py-12 bg-white">
              <PromotionCarousel onSelectProduct={handleOpenProduct} />
            </section>
            <StoryGrid onSelectStory={handleOpenStory} />
            <FeaturedImageSection />
            <ProductShowcaseSection onNavigateToProducts={() => setCurrentView('products')} />
            <StoreLocatorSection onNavigateToStores={() => setCurrentView('stores')} />
            <RecipeSection
              onNavigateToRecipes={() => setCurrentView('recipes')}
              onSelectRecipe={handleOpenRecipe}
            />
          </>
        )}

        {currentView === 'products' && (
          <ProductsPage onSelectProduct={handleOpenProduct} />
        )}

        {currentView === 'product-details' && selectedProduct && (
          <ProductDetailsPage
            product={selectedProduct}
            onBack={handleBackToProducts}
          />
        )}

        {currentView === 'recipes' && (
          <RecipesPage onSelectRecipe={handleOpenRecipe} />
        )}

        {currentView === 'recipe-details' && selectedRecipe && (
          <RecipeDetailsPage
            recipe={selectedRecipe}
            onBack={handleBackToRecipes}
            onSelectProduct={handleOpenProduct}
          />
        )}

        {currentView === 'story-details' && selectedStory && (
          <StoryDetailsPage
            story={selectedStory}
            onBack={() => { setCurrentView('blog'); window.scrollTo(0, 0); }}
          />
        )}

        {currentView === 'blog' && (
          <BlogPage onSelectStory={handleOpenStory} />
        )}

        {currentView === 'about' && (
          <AboutPage />
        )}

        {currentView === 'stores' && (
          <StoreLocatorPage />
        )}

        {currentView === 'privacy' && (
          <PrivacyPage />
        )}

        {currentView === 'terms' && (
          <TermsPage />
        )}

        {currentView === 'admin' && (
          session ? (
            <AdminPage onExit={() => setCurrentView('home')} />
          ) : (
            <AdminLoginPage onLoginSuccess={() => setCurrentView('admin')} />
          )
        )}
      </main>

      {currentView !== 'admin' && (
        <Footer
          onNavigateAdmin={() => setCurrentView('admin')}
          onNavigate={(view) => setCurrentView(view)}
        />
      )}
    </div>
  );
};

export default App;