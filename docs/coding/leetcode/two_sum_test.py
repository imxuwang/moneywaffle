from parameterized import parameterized
import timeout_decorator
import unittest

from two_sum import Solution


class TestTwoSum(unittest.TestCase):
    @parameterized.expand([
        ([2, 7, 11, 15], 9, [0, 1]),
        ([3, 2, 4], 6, [1, 2]),
        ([3, 3], 6, [0, 1]),
    ])
    @timeout_decorator.timeout(1)
    def test_two_sum_find(self, nums, target, expected):
        self.assertEqual(Solution().two_sum(nums, target), expected)

    def test_load_test(self):
        nums = list(range(10000))
        target = 19997
        want = [9998, 9999]
        got = Solution().two_sum(nums, target)
        got.sort()
        self.assertEqual(Solution().two_sum(nums, target), want)

    @parameterized.expand([
        ([2, 7, 11, 15], 9, [0, 1]),
        ([3, 2, 4], 6, [1, 2]),
        ([3, 3], 6, [0, 1]),
    ])
    @timeout_decorator.timeout(1)
    def test_two_sum2_find(self, nums, target, expected):
        self.assertEqual(Solution().two_sum2(nums, target), expected)

    def test_load_test2(self):
        nums = list(range(10000))
        target = 19997
        want = [9998, 9999]
        got = Solution().two_sum(nums, target)
        got.sort()
        self.assertEqual(Solution().two_sum2(nums, target), want)


if __name__ == "__main__":
    unittest.main()