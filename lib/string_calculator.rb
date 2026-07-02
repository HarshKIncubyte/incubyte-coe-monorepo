# frozen_string_literal: true

class StringCalculator
  def self.add(numbers)
    return 0 if numbers.empty?

    delimiter, numbers = extract_delimiter(numbers)
    numbers.split(delimiter).sum(&:to_i)
  end

  def self.extract_delimiter(numbers)
    return [/,|\n/, numbers] unless numbers.start_with?('//')

    delimiter = numbers[2]
    numbers = numbers.split("\n", 2).last
    [delimiter, numbers]
  end

  private_class_method :extract_delimiter
end
