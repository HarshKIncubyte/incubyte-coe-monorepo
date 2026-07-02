# frozen_string_literal: true

class StringCalculator
  def self.add(numbers)
    return 0 if numbers.empty?

    if numbers.start_with?('//')
      delimiter = numbers[2]
      numbers = numbers.split("\n", 2).last
    else
      delimiter = /,|\n/
    end

    numbers.split(delimiter).sum(&:to_i)
  end
end
