# frozen_string_literal: true

class StringCalculator
  def self.add(numbers)
    delimiter, numbers = extract_delimiter(numbers)
    nums = numbers.split(delimiter).map(&:to_i).reject { |n| n > 1000 }
    validate_negatives(nums)

    nums.sum
  end

  def self.extract_delimiter(numbers)
    return [/,|\n/, numbers] unless numbers.start_with?('//')

    delimiter = numbers[2]
    numbers = numbers.split("\n", 2).last
    [delimiter, numbers]
  end

  def self.validate_negatives(nums)
    negatives = nums.select(&:negative?)
    raise ArgumentError, "negative numbers not allowed: #{negatives.join(', ')}" if negatives.any?
  end

  private_class_method :extract_delimiter, :validate_negatives
end
