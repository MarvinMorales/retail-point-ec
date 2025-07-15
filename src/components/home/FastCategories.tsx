import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const FastCategories = ({ data }: Record<string, any>) => {
  const { fastCategoriesSection } = data.website;
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Record<string, any> | null>(null);

  const handleOpenModal = (category: Record<string, any>) => {
    setSelectedCategory(category);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCategory(null);
  };

  const CategoryCard = ({ category, id }: { category: Record<string, any>; id: number }) => (
    <div
      key={id}
      onClick={() => handleOpenModal(category)}
      className="flex flex-col p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 h-full cursor-pointer"
    >
      <h3 className="text-blue-900 font-semibold text-lg text-center">{category.name}</h3>
    </div>
  );

  return (
    <section className="w-full py-[100px] bg-gradient-to-r from-gray-50 to-gray-100">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 text-center mb-16">
        {fastCategoriesSection.title}
      </h2>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.categories.map((category: Record<string, any>, i: number) => (
            <CategoryCard key={category.id} id={i} category={category} />
          ))}
        </div>
      </div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", md: "80%", lg: "60%" },
            height: { xs: "95%", md: "70%" },
            maxHeight: { md: 600 },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 0,
            borderRadius: 2,
            outline: "none",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            overflow: "hidden",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 10,
              color: (theme) => theme.palette.grey[600],
            }}
          >
            <CloseIcon />
          </IconButton>

          {selectedCategory && (
            <>
              <div className="w-full md:w-3/5 h-[40%] md:h-auto overflow-hidden bg-gray-100 flex items-center justify-center p-4">
                {selectedCategory.coverImage ? (
                  <img
                    src={selectedCategory.coverImage}
                    alt={selectedCategory.name}
                    className="max-h-full max-w-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-center p-4">
                    No hay imagen disponible
                  </div>
                )}
              </div>

              <div className="w-full md:w-3/5 p-6 overflow-y-auto flex flex-col">
                <h2 className="text-2xl font-bold mb-2 mt-6 text-gray-800">
                  {selectedCategory.name}
                </h2>
                <div className="text-gray-600 mb-6">
                  {selectedCategory.description || "No hay descripción disponible para esta categoría."}
                </div>
              
              </div>
            </>
          )}
        </Box>
      </Modal>
    </section>
  );
};

export default FastCategories;
