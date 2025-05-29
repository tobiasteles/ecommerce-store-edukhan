import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboards = await getBillboard("ab458f52-55a5-4184-be26-dc0f78780f24");

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard
          data={Array.isArray(billboards) ? billboards[0] : billboards}
        />

        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Produtos em Destaque" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
