module Erp
  module Vinhhaoninhthuan
    module Frontend
      class CategoryController < Erp::Frontend::FrontendController
        def product_listing
          @body_class = "page-with-filter page-products categorypath-football-group1-category-4 category-category-4 catalog-category-view page-layout-2columns-left"
        end
        
        def product_detail
          @body_class = "catalog-product-view product-virtual-product page-layout-1column"
        end
      end
    end
  end
end