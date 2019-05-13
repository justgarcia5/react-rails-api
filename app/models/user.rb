class User < ApplicationRecord

  validates :first_name, :last_name, :age, presence: true

end
