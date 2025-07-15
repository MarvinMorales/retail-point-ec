// Tipos para los datos
type MenuItem = {
  id: string;
  name: string;
  redirects: string;
};

type SubCategory = {
  id: string;
  name: string;
  description?: string;
  coverImage?: string;
  tags?: string[];
};

type Category = {
  id: string;
  name: string;
  description?: string;
  coverImage?: string;
  tags?: string[];
  subCategory: SubCategory[] | null;
};

type PdfCatalog = {
  name: string;
  link: string;
};

export type NavbarProps = {
  data: {
    website: {
      header: {
        menu: MenuItem[];
        logo: string;
      };
    };
    categories: Category[];
    allProducts: Record<string, any>;
    businessInformation: {
      pdfCatalogs: PdfCatalog[];
    };
  };
}