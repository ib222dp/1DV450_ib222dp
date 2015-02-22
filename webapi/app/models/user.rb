class User < ActiveRecord::Base
  
  include Rails.application.routes.url_helpers 
  
  has_many :attractions, :dependent => :destroy
  
  def serializable_hash (options={})
    options = {
      only: [:username],
      include: [:attractions],
      methods: [:self_link]
    }.update(options)
    super(options)
  end
  
  def self_link
    { :self => "#{Rails.configuration.baseurl}#{user_path(self)}" }
  end
  
  has_secure_password
end
