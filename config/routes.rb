Erp::Vinhhaoninhthuan::Engine.routes.draw do
  root to: "frontend/home#index"
  
  get "chuyen-muc-san-pham.html" => "frontend/category#product_listing", as: :product_listing
  get "chuyen-muc-san-pham/chi-tiet-san-pham.html" => "frontend/category#product_detail", as: :product_detail
  
  get "gioi-thieu.html" => "frontend/information#about_us", as: :about_us
  get "lien-he.html" => "frontend/information#contact_us", as: :contact_us
end