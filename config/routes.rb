Rails.application.routes.draw do
  root to: 'app#index'

  resource 'reddit', only: %w(index show)
end
