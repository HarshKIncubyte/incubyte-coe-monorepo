# frozen_string_literal: true

class StringCalculator
  def self.add(numbers)
    delimiter, numbers = extract_delimiter(numbers)
    nums = numbers.split(delimiter).map(&:to_i)
    nums = filter_large_numbers(nums)
    validate_negatives(nums)

    nums.sum
  end

  def self.extract_delimiter(numbers)
    return [/,|\n/, numbers] unless numbers.start_with?('//')

    header, numbers = numbers.split("\n", 2)
    delimiter = parse_delimiter(header[2..])
    [delimiter, numbers]
  end

  def self.parse_delimiter(header)
    return header unless header.start_with?('[')

    build_delimiter_pattern(header)
  end

  def self.build_delimiter_pattern(header)
    delimiters = header.scan(/\[([^\]]+)\]/).flatten
    Regexp.union(delimiters)
  end

  def self.validate_negatives(nums)
    negatives = nums.select(&:negative?)
    raise ArgumentError, "negative numbers not allowed: #{negatives.join(', ')}" if negatives.any?
  end

  def self.filter_large_numbers(nums)
    nums.reject { |n| n > 1000 }
  end

  private_class_method :extract_delimiter, :validate_negatives, :filter_large_numbers, :parse_delimiter,
                       :build_delimiter_pattern
end
