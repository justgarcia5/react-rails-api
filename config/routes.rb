Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users

  get '/*path', to: 'users#index', constraints: ->(request){ request.format.html? }

  root 'users#index'
end
