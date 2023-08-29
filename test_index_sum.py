from unittest import TestCase


def find_sum_indexes(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]

def test_find_sum_indexes():
    # Arrange
    input = [1, 3, 5, 7]
    target = 10

    # Act
    result = find_sum_indexes(input, target)

    # Assert
    assert result == [1, 3]


    class TestFindSumIndexes(TestCase):
        def test_find_sum_indexes(self):
            # Arrange
            input = [1, 3, 5, 7]
            target = 10

            # Act
            result = find_sum_indexes(input, target)

            # Assert
            self.assertListEqual(result, [1, 3])
