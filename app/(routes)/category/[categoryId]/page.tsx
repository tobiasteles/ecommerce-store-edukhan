import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import Filter from "./components/filter";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import MobileFilters from "./components/mobile-filters";

export const revalidate = 0;

interface CategoryPageProps {
  // CORRECTION: params is a Promise in Next.js 15 Canary
  params: Promise<{
    categoryId: string;
  }>;
  // CORRECTION: searchParams is a Promise in Next.js 15 Canary
  searchParams: Promise<{
    colorId: string;
    sizeId: string;
  }>;
}

// CORRECTION: Removed React.FC as it's not typically used for Server Components
const CategoryPage = async ({
  params,
  searchParams,
}: CategoryPageProps) => {
  // CORRECTION: Await params and searchParams before accessing their properties
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;

  const products = await getProducts({
    categoryId: awaitedParams.categoryId,
    colorId: awaitedSearchParams.colorId,
    sizeId: awaitedSearchParams.sizeId,
  });

  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(awaitedParams.categoryId);

  return (
    <div className="bg-white">
      <Container>
        <Billboard data={category.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters sizes={sizes} colors={colors} />
            <div className="lg:block">
              <Filter valueKey="sizeId" name="Tamanhos" data={sizes} />
              <Filter valueKey="colorId" name="Cores" data={colors} />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
