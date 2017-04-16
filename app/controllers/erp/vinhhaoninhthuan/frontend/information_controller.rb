module Erp
  module Vinhhaoninhthuan
    module Frontend
      class InformationController < Erp::Frontend::FrontendController
        def about_us
          @body_class = "page-products categorypath-about category-about catalog-category-view page-layout-1column"
        end
        
        def contact_us
          @body_class = "page-products categorypath-contact category-contact catalog-category-view page-layout-1column"
        end
      end
    end
  end
end