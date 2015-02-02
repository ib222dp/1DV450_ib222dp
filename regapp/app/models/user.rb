class User < ActiveRecord::Base
  before_save { self.email = email.downcase }
  has_one :api_key
  
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email,
            presence: {message: "Du måste ange en epost-adress"},
            length:  { maximum: 255 },
            format: { with:  VALID_EMAIL_REGEX },
            uniqueness: { case_sensitive: false }
  
  validates :app_url,
            presence: {message: "Du måste ange en länk till din applikation"}
   
  has_secure_password
end
