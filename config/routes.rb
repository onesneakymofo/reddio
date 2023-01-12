Rails.application.routes.draw do
  root to: 'app#index'

  resource 'listing', only: %w(show)
end
