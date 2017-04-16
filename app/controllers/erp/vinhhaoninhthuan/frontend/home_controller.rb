module Erp
  module Vinhhaoninhthuan
    module Frontend
      class HomeController < Erp::Frontend::FrontendController
        def index
          @body_class = "cms-home cms-index-index page-layout-1column"
        end
      end
    end
  end
end