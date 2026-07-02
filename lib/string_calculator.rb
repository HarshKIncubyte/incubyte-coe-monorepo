# frozen_string_literal: true

class StringCalculator
  def self.add(numbers)
    return 0 if numbers.empty?

    numbers.split(/,|\n/).sum(&:to_i)
  end
end
