Rails.application.routes.draw do

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'users#index'
  
  resources :users
  
  get 'user_api_key' => 'api_keys#show', as: :userapikey
  get 'admin_api_keys' => 'admin_api_keys#show', as: :adminapikeys
  
  post 'user_delete_key' => 'api_keys#deletekey', as: :userdeletekey
  get 'user_revoke_key' => 'api_keys#revokekey', as: :userrevokekey
  
  post 'admin_delete_key' => 'admin_api_keys#deletekey', as: :admindeletekey
  get 'admin_revoke_key' => 'admin_api_keys#revokekey', as: :adminrevokekey
  
  post  'user_login'   => 'users#login',  as: :userlogin
  get   'user_logout'  => 'users#logout', as: :userlogout
  
  get 'admin' => 'admins#index', as: :admin
  post 'admin_login' => 'admins#adminlogin', as: :adminlogin
  get 'admin_logout' => 'admins#adminlogout', as: :adminlogout
 
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
    
 

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
