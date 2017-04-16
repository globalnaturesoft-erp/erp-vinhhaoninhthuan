Erp::Vinhhaoninhthuan::Engine.routes.draw do
  root to: "frontend/home#index"
  get "chuyen-muc-san-pham.html" => "frontend/category#listing", as: :product_listing
  get "chuyen-muc-san-pham/chi-tiet-san-pham.html" => "frontend/category#product_detail", as: :product_detail
end