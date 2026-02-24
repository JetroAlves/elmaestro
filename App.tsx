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
import AboutPage from './components/AboutPage';
import StoreLocatorPage from './components/StoreLocatorPage';
import AdminPage from './components/AdminPage';

const App: React.FC = () => {
  console.log("App mounting...");
  useEffect(() => {
    console.log("App mounted");
  }, []);
  const [currentView, setCurrentView] = useState<'home' | 'products' | 'product-details' | 'recipes' | 'recipe-details' | 'about' | 'stores' | 'admin'>('home');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

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

  const handleBackToProducts = () => {
    setCurrentView('products');
    window.scrollTo(0, 0);
  };

  const handleBackToRecipes = () => {
    setCurrentView('recipes');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAE6]">
      {currentView !== 'admin' && <Header onNavigate={(view) => setCurrentView(view)} />}

      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <Hero
              onNavigateToProducts={() => setCurrentView('products')}
              onNavigateToStores={() => setCurrentView('stores')}
            />
            <section className="py-32 px-4 bg-[#FCFAE6]">
              <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#101010] leading-tight tracking-tight text-balance">
                  Eternizando momentos
                </h2>
              </div>
            </section>
            <section className="bg-[#FCFAE6]">
              <PromotionCarousel onSelectProduct={handleOpenProduct} />
            </section>
            <StoryGrid />
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

        {currentView === 'about' && (
          <AboutPage />
        )}

        {currentView === 'stores' && (
          <StoreLocatorPage />
        )}

        {currentView === 'admin' && (
          <AdminPage onExit={() => setCurrentView('home')} />
        )}
      </main>

      {currentView !== 'admin' && <Footer onNavigateAdmin={() => setCurrentView('admin')} />}
    </div>
  );
};

export default App;