class Admin < ActiveRecord::Base
  has_secure_password
  has_many :api_keys
end
