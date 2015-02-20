class Creator < ActiveRecord::Base
  before_save { self.email = email.downcase }
  before_save { self.username = username.downcase }
  has_many :attractions
  
  validates :username,
            presence: {message: "Du måste ange ett användarnamn"},
            length: { maximum: 255 }
            uniqueness: { case_sensitive: false }
            
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email,
            presence: {message: "Du måste ange en epost-adress"},
            length:  { maximum: 255 },
            format: { with:  VALID_EMAIL_REGEX },
            uniqueness: { case_sensitive: false }
  
  has_secure_password
end
