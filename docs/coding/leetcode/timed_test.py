import time
import unittest


class TimedTestCase(unittest.TestCase):
    def run(self, result=None):
        start_time = time.time()
        super().run(result)
        end_time = time.time()
        print(f'{self._testMethodName} ran in {end_time - start_time:.4f} seconds')