class Solution:
    def two_sum(self, nums: list[int], target: int) -> list[int]:
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                if nums[i] + nums[j] == target:
                    return [i, j]
        return []

    def two_sum2(self, nums: list[int], target: int) -> list[int]:
        hash_table = {}
        for i, num in enumerate(nums):
            if target - num in hash_table:
                return [hash_table[target - num], i]
            hash_table[num] = i
        return []