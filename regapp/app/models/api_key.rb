class ApiKey < ActiveRecord::Base
  belongs_to :user
  belongs_to :admin
  before_create :generate_api_key_value
  
  validates :api_key_value,
            uniqueness: true
  
  private
  
  def generate_api_key_value
    puts "test"
    begin
      self.api_key_value = SecureRandom.hex
    end while self.class.exists?(api_key_value: api_key_value)
  end

end
