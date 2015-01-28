class ApiKey < ActiveRecord::Base
  belongs_to :user, :admin
end
