class User < ActiveRecord::Base
  has_secure_password
  has_one :api_key
  
  validates :email,
            :presence => {:message => "Du måste ange en epost-adress"},
            uniqueness: true
  
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i,
                      :presence => {:message => "Felaktig epost-adress"}
end
