import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";


interface ProductPageProps {
  // CORRECTION: params is a Promise in Next.js 15 Canary
  params: Promise<{
    productId: string;
  }>;
}

// CORRECTION: Removed React.FC as it's not typically used for Server Components
const ProductPage = async ({
  params
}: ProductPageProps) => {
  // CORRECTION: Await params before accessing its properties
  const awaitedParams = await params;

  const product = await getProduct(awaitedParams.productId);

  // Handle case where product might not be found
  if (!product) {
    // You might want to render a 404 page or a "Product not found" message
    return (
      <div className="bg-white">
        <Container>
          <div className="px-4 py-10 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900">Product not found.</h2>
          </div>
        </Container>
      </div>
    );
  }

  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id // Use optional chaining just in case category is null
  });

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={product} />
            </div>
          </div>
          <hr className="my-10" />
          <ProductList title="Itens Relacionados" items={suggestedProducts} />
        </div>
      </Container>
    </div>
  );
}

export default ProductPage;
