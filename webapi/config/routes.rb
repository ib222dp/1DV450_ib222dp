Rails.application.routes.draw do
  
  post '/login' => 'sessions#api_auth'
  post '/auth' => 'sessions#api_auth'
  
  resources :users do
    resources :attractions, only: [:index]
  end
  resources :tags do
    resources :attractions, only: [:index]
  end
  resources :attractions, only: [:index, :show, :create, :update, :destroy]

end
